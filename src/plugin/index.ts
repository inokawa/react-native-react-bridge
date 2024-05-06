/**
 * Custom babelTransformer for metro bundler
 *
 * @module
 */

// @ts-expect-error
import metroTransformer from "metro-react-native-babel-transformer";
import { isEntryFile } from "./babel";
import { bundle } from "./bundler";
import { wrapWithWebViewHTML } from "./html";

export const transform = async (args: any /* TODO */) => {
  const { filename, src } = args;
  const isEntry = isEntryFile(src, filename);
  if (isEntry) {
    const res = await bundle(filename, wrapWithWebViewHTML);
    return metroTransformer.transform({
      ...args,
      src: "export default " + res,
    });
  }

  return metroTransformer.transform(args);
};
