import { ROOT_ID } from "../constants";

/**
 * @internal
 */
export const buildWebEntryModule = (js: string): string => {
  // https://github.com/inokawa/react-native-react-bridge/pull/133
  js = js.replace(/([`$])/g, "\\$1");
  return (
    "export default String.raw`\n" +
    wrapByHtml(js) +
    "\n`.replace(/\\\\([`$])/g, '\\$1')"
  );
};

const wrapByHtml = (js: string): string => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
</head>
<body style="margin: 0 !important;padding: 0 !important;">
  <div id="${ROOT_ID}"></div>
  <script type="text/javascript">(function(){${js}})()</script>
</body>
</html>
`;
