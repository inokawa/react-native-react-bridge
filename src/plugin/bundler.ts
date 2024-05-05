import Metro from "metro";

const babelTransformerPath = require.resolve("./transformer");
const codeExts = ["js", "ts", "jsx", "tsx", "mjs", "cjs"];
const htmlExts = ["htm", "html", "css"];
const imageExts = ["bmp", "gif", "png", "jpg", "jpeg", "webp", "svg"];
const textExts = ["txt", "md"];
const sourceExts = [
  ...codeExts,
  ...htmlExts,
  ...imageExts,
  ...textExts,
  "json",
  "wasm",
];

export const bundle = async (filename: string): Promise<string> => {
  const config = await Metro.loadConfig();

  // @ts-expect-error
  config.resolver.sourceExts = sourceExts;
  // @ts-expect-error
  config.resolver.assetExts = config.resolver.assetExts.filter(
    (ext) => !sourceExts.includes(ext)
  );
  // @ts-expect-error
  config.transformer.babelTransformerPath = babelTransformerPath;

  // @ts-expect-error
  const { code, map } = await Metro.runBuild(config, {
    entry: filename,
    platform: "rnrb",
    minify: true,
  });
  return code;
};
