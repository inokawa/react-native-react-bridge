import { ROOT_ID } from "../common";

const escape = (src) => src.replace(/`/g, "\\`");

export const createContent = (js) =>
  `export default String.raw\`${escape(wrapByHtml(js))}\`;`;

const wrapByHtml = (js) => `
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
