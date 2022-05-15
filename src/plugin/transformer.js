const path = require("path");
const fs = require("fs");
const { TextEncoder } = require("util");
const metroTransformer = require("metro-react-native-babel-transformer");

let metroOptions = {};
try {
  const metroConfigPath = path.join(process.cwd(), "metro.config.js");
  metroOptions = require(metroConfigPath).rnrb || {};
} catch {
  // NOP
}

module.exports.transform = async (args) => {
  const { filename, src, options, plugins } = args;
  if (metroOptions.preact === true) {
    args = {
      ...args,
      plugins: [
        ...plugins,
        [
          "module-resolver",
          {
            root: ["."],
            alias: {
              react: "preact/compat",
              "react-dom": "preact/compat",
              "react/jsx-runtime": "preact/jsx-runtime",
            },
          },
        ],
      ],
    };
  }

  const ext = path.extname(filename);
  switch (ext) {
    case ".htm":
    case ".html":
      return metroTransformer.transform({
        ...args,
        src: injectString(src),
      });
    case ".css":
      return metroTransformer.transform({
        ...args,
        src: injectCss(src),
      });
    case ".txt":
    case ".md":
      return metroTransformer.transform({
        ...args,
        src: injectString(src),
      });
    case ".bmp":
      return metroTransformer.transform({
        ...args,
        src: injectImage(filename, "bmp"),
      });
    case ".gif":
      return metroTransformer.transform({
        ...args,
        src: injectImage(filename, "gif"),
      });
    case ".png":
      return metroTransformer.transform({
        ...args,
        src: injectImage(filename, "png"),
      });
    case ".jpg":
    case ".jpeg":
      return metroTransformer.transform({
        ...args,
        src: injectImage(filename, "jpeg"),
      });
    case ".webp":
      return metroTransformer.transform({
        ...args,
        src: injectImage(filename, "webp"),
      });
    case ".svg":
      return metroTransformer.transform({
        ...args,
        src: injectImage(filename, "svg+xml"),
      });
    case ".wasm":
      return metroTransformer.transform({
        ...args,
        src: injectWasm(src),
      });
    default:
      break;
  }

  return metroTransformer.transform(args);
};

const escape = (src) => src.replace(/`/g, "\\`");

const injectString = (src) => {
  return `export default String.raw\`${escape(src)}\``;
};

const injectCss = (src) => `
(function () {
  var css = String.raw\`${escape(src)}\`;
  var head = document.head || document.getElementsByTagName("head")[0];
  var style = document.createElement("style");
  style.type = "text/css";
  style.appendChild(document.createTextNode(css));
  head.appendChild(style);
})();
`;

const injectImage = (filename, ext) => {
  const src = fs.readFileSync(filename, "base64");
  return `export default "data:image/${ext};base64,${src}";`;
};

const injectWasm = (src) => {
  const buf = new TextEncoder().encode(src);
  return `
module.exports = (function () {
  const wasmModule = new WebAssembly.Module(Uint8Array.from([${buf.toString()}]));
  const instance = new WebAssembly.Instance(wasmModule);
  return instance.exports;
})();
`;
};
