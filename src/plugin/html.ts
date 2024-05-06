import { WEB_ROOT_ID } from "../constants";

/**
 * @internal
 */
export const injectCode = (src: string, withHtml: (src: string) => string) => {
  // https://github.com/inokawa/react-native-react-bridge/pull/133
  src = src.replace(/([`$])/g, "\\$1");
  return (
    "String.raw`\n" +
    withHtml(`(function(){${src}})()`) +
    "\n`.replace(/\\\\([`$])/g, '\\$1')"
  );
};

/**
 * @internal
 */
export const buildWebEntryModule = (src: string): string => {
  return (
    "export default " +
    injectCode(
      src,
      (js) => `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  </head>
  <body style="margin: 0 !important;padding: 0 !important;">
    <div id="${WEB_ROOT_ID}"></div>
    <script type="text/javascript">${js}</script>
  </body>
  </html>
  `
    )
  );
};
