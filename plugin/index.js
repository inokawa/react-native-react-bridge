const metroTransformer = require("metro-react-native-babel-transformer");
const { extractEntryPaths, replaceEntryPaths } = require("./babel");
const { bundle } = require("./metro");
module.exports.transform = transform;

const transform = async (args) => {
  const { filename, src, options } = args;
  if (/App\.(jsx|tsx)$/.test(filename)) {
    const compPaths = extractEntryPaths(src, filename);
    if (compPaths.length !== 0) {
      const compStrs = await bundle(compPaths);
      const result = replaceEntryPaths(src, filename, compStrs);

      return metroTransformer.transform({ ...args, src: result.code });
    }
  }

  return metroTransformer.transform(args);
};
