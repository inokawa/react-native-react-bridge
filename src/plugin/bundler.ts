import * as esbuild from "esbuild";

import { readFile } from "fs/promises";
import { TextEncoder } from "util";

import { wrapWithWebViewHTML } from "./html";

export interface RNRBConfig {
  preact?: boolean;
  web?: boolean;
}

export const ESCAPE = "REACT_NATIVE_REACT_BRIDGE_ESCAPE"

/** @internal */
export const escape = (src: string) => src.replace(/`/g, ESCAPE);

const injectString = async (path: string): Promise<string> => {
  const src = await readFile(path, "utf8");
  return escape(src);
};

const injectCss = async (path: string): Promise<string> => {
  const src = await readFile(path, "utf8");
  return `
(function () {
  var css = String.raw\`${escape(src)}\`;
  var head = document.head || document.getElementsByTagName("head")[0];
  var style = document.createElement("style");
  style.type = "text/css";
  style.appendChild(document.createTextNode(css));
  head.appendChild(style);
})();
`;
};

const injectImage = async (path: string, ext: string): Promise<string> => {
  const src = await readFile(path, "base64");
  return `data:image/${ext};base64,${src}`;
};

const injectWasm = async (path: string): Promise<string> => {
  const src = await readFile(path, "utf8");
  const buf = new TextEncoder().encode(src);
  return `
module.exports = (function () {
  const wasmModule = new WebAssembly.Module(Uint8Array.from([${buf.toString()}]));
  const instance = new WebAssembly.Instance(wasmModule);
  return instance.exports;
})();
`;
};

/**
 * @internal
 */
export const bundle = async (
  filename: string,
  options: RNRBConfig = {},
  esbuildOptions: Omit<esbuild.BuildOptions , "write" | "entryPoints" | "alias"> = {},
): Promise<string> => {
  const alias: Record<string, string> = {};

  let jsx: "automatic" | undefined;
  let jsxImportSource: string | undefined;
  if (options.preact) {
    alias["react"] = "preact/compat";
    alias["react-dom"] = "preact/compat";
    alias["react/jsx-runtime"] = "preact/jsx-runtime";
    jsxImportSource = "preact";
    jsx = "automatic";
  }
  if (options.web) {
    alias["react-native"] = "react-native-web";
  }

  const {plugins, ...restOptions} = esbuildOptions;

  const bundled = await esbuild.build({
    entryPoints: [filename],
    bundle: true,
    minify: true,
    write: false,
    alias,
    jsx,
    jsxImportSource,
    plugins: [
      {
        name: "rnrb-plugin",
        setup(build) {
          build.onLoad({ filter: /.(txt|md|html?)$/ }, async (args) => {
            return {
              contents: await injectString(args.path),
              loader: "text",
            };
          });
          build.onLoad({ filter: /.css$/ }, async (args) => {
            return {
              contents: await injectCss(args.path),
              loader: "js",
            };
          });
          build.onLoad({ filter: /.bmp$/ }, async (args) => {
            return {
              contents: await injectImage(args.path, "bmp"),
              loader: "text",
            };
          });
          build.onLoad({ filter: /.gif$/ }, async (args) => {
            return {
              contents: await injectImage(args.path, "gif"),
              loader: "text",
            };
          });
          build.onLoad({ filter: /.png$/ }, async (args) => {
            return {
              contents: await injectImage(args.path, "png"),
              loader: "text",
            };
          });
          build.onLoad({ filter: /.(jpg|jpeg)$/ }, async (args) => {
            return {
              contents: await injectImage(args.path, "jpeg"),
              loader: "text",
            };
          });
          build.onLoad({ filter: /.webp$/ }, async (args) => {
            return {
              contents: await injectImage(args.path, "webp"),
              loader: "text",
            };
          });
          build.onLoad({ filter: /.svg$/ }, async (args) => {
            return {
              contents: await injectImage(args.path, "svg+xml"),
              loader: "text",
            };
          });
          build.onLoad({ filter: /.wasm$/ }, async (args) => {
            return {
              contents: await injectWasm(args.path),
              loader: "js",
            };
          });
        },
      },
      ...(plugins || [])
    ],
    ...restOptions,
  });

  const code = bundled.outputFiles[0]!.text;

  return wrapWithWebViewHTML(`(function(){${code}})()`);
};
