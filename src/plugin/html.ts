import { WEB_ROOT_ID } from "../constants";

/**
 * @internal
 */
export const wrapWithWebViewHTML = (js: string): string => `
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
`;
