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

export const bundle = async (
  filename: string,
  wrapHtml?: (s: string) => string
): Promise<string> => {
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
  let { code } = await Metro.runBuild(config, {
    entry: filename,
    platform: "rnrb",
    minify: true,
  });

  // https://github.com/inokawa/react-native-react-bridge/pull/133
  code = code.replace(/([`$])/g, "\\$1");

  code = `(function(){${code}})()`;

  if (wrapHtml) {
    code = wrapHtml(code);
  }

  code = "String.raw`\n" + code + "\n`.replace(/\\\\([`$])/g, '\\$1')";

  return code;
};
