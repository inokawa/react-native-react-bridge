const path = require("path");
const metroTransformer = require("metro-react-native-babel-transformer");

module.exports.transform = async (args) => {
  const { filename, src, options } = args;

  const ext = path.extname(filename);
  switch (ext) {
    case ".css":
      return metroTransformer.transform({
        ...args,
        src: injectCss(src),
      });
    case ".bmp":
      return metroTransformer.transform({
        ...args,
        src: injectImage(src, "bmp"),
      });
    case ".gif":
      return metroTransformer.transform({
        ...args,
        src: injectImage(src, "gif"),
      });
    case ".png":
      return metroTransformer.transform({
        ...args,
        src: injectImage(src, "png"),
      });
    case ".jpg":
    case ".jpeg":
      return metroTransformer.transform({
        ...args,
        src: injectImage(src, "jpeg"),
      });
    case ".webp":
      return metroTransformer.transform({
        ...args,
        src: injectImage(src, "webp"),
      });
    case ".svg":
      return metroTransformer.transform({
        ...args,
        src: injectImage(src, "svg+xml"),
      });
    default:
      break;
  }

  return metroTransformer.transform(args);
};

const injectCss = (css) => `
(function () {
  var css = String.raw\`${css}\`;
  var head = document.head || document.getElementsByTagName("head")[0];
  var style = document.createElement("style");
  style.type = "text/css";
  style.appendChild(document.createTextNode(css));
  head.appendChild(style);
})();
`;

const injectImage = (src, ext) =>
  `export default String.raw\`data:image/${ext};base64,${Buffer.from(
    src
  ).toString("base64")}\`;`;
