/**
 * Custom babelTransformer for metro bundler
 *
 * @module
 */

// @ts-expect-error
import metroTransformer from "metro-react-native-babel-transformer";
import { isEntryFile } from "./babel";
import { bundle } from "./metro";
import { buildWebEntryModule } from "./html";

export const transform = async (args: any /* TODO */) => {
  const { filename, src } = args;
  const isEntry = isEntryFile(src, filename);
  if (isEntry) {
    const res = await bundle(filename);
    return metroTransformer.transform({
      ...args,
      src: buildWebEntryModule(res),
    });
  }

  return metroTransformer.transform(args);
};
