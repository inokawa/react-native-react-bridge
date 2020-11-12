// const metroTransformer = require("metro-react-native-babel-transformer");
const Metro = require("metro");
const p = require("path");
const { transformer } = require("./template");
const fs = require("fs");

const MODULE_NAME = "./temp-module.js";
const babelTransformerPath = p.join(__dirname, `${MODULE_NAME}`);

module.exports.bundle = async (entryPaths) => {
  const compStrs = {};
  const config = await Metro.loadConfig();
  config.resolver.sourceExts = ["js", "ts", "jsx", "tsx"];
  config.transformer.babelTransformerPath = babelTransformerPath;

  for (const entryPath of entryPaths) {
    fs.writeFileSync(babelTransformerPath, transformer(entryPath));
    try {
      const { code, map } = await Metro.runBuild(config, {
        entry: entryPath,
        platform: "web",
        minify: true,
      });
      compStrs[entryPath] = code;
    } catch (e) {
      console.log(e);
    }
  }
  return compStrs;
};
