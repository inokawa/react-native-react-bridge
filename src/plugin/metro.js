import Metro from "metro";

const babelTransformerPath = require.resolve("./transformer");

export const bundle = async (filename) => {
  const config = await Metro.loadConfig();
  config.resolver.sourceExts = ["js", "ts", "jsx", "tsx", "css"];
  config.transformer.babelTransformerPath = babelTransformerPath;
  const { code, map } = await Metro.runBuild(config, {
    entry: filename,
    platform: "web",
    minify: true,
  });
  return code;
};
