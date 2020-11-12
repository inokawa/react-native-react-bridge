import React, { useMemo, useCallback, useRef, useEffect } from "react";
import WebView, { WebViewProps } from "react-native-webview";

const WHITE_LIST = ["*"];

export type Props = Omit<WebViewProps, "source" | "originWhitelist"> & {
  children: React.ReactNode;
};

export const RNDOM = ({ children, ...rest }: Props) => {
  return (
    <WebView
      {...rest}
      originWhitelist={WHITE_LIST}
      source={useMemo(
        () => ({
          html: `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  </head>
  <body>
    <div id="root" />
    <script>(${children?.toString()})()</script>
  </body>
</html>
`,
        }),
        [children]
      )}
    />
  );
};
