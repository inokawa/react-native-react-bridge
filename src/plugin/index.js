import metroTransformer from "metro-react-native-babel-transformer";
import { isEntryFile } from "./babel";
import { bundle } from "./metro";

export const transform = async (args) => {
  const { filename, src, options } = args;
  const isEntry = isEntryFile(src, filename);
  if (isEntry) {
    const res = await bundle(filename);
    return metroTransformer.transform({
      ...args,
      src: `export default String.raw\`${res}\`;`,
    });
  }

  return metroTransformer.transform(args);
};
