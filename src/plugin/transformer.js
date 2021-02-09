const metroTransformer = require("metro-react-native-babel-transformer");

module.exports.transform = async (args) => {
  const { filename, src, options } = args;

  if (filename.endsWith(".css")) {
    return metroTransformer.transform({
      ...args,
      src: injectCss(src),
    });
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
