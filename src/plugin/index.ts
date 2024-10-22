/**
 * Custom babelTransformer for metro bundler
 *
 * @module
 */

import type { BuildOptions } from "esbuild";
import { isEntryFile } from "./babel";
import { ESCAPE, RNRBConfig, bundle, escape } from "./bundler";
import { join } from "path";

const metroTransformer = (() => {
  try {
    // expo >=50.0
    return require("@expo/metro-config/babel-transformer");
  } catch (e) {}

  try {
    // react-native >=0.73
    return require("@react-native/metro-babel-transformer");
  } catch (e) {}

  // react-native <0.73
  return require("metro-react-native-babel-transformer");
})();

let metroOptions: RNRBConfig | undefined;
try {
  const metroConfigPath = join(process.cwd(), "metro.config.js");
  metroOptions = require(metroConfigPath).rnrb;
} catch {
  // NOP
}

export const createTransformer = (
  esbuildOptions: Omit<BuildOptions, "write" | "entryPoints" | "alias"> = {}
) => {
  return async (args: any /* TODO */) => {
    const { filename, src } = args;
    const isEntry = isEntryFile(src, filename);
    if (isEntry) {
      const res = await bundle(filename, metroOptions, esbuildOptions);
      return metroTransformer.transform({
        ...args,
        src:
          "export default String.raw`" +
          escape(res).replace(/\$/g, '\\$') +
          "`.replace(/\\\\([`$])/g, '\\$1')" + 
          `.replace('${ESCAPE}','\`')`
      });
    }

    return metroTransformer.transform(args);
  };
};

export const transform = createTransformer();
