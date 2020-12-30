import { useCallback, useMemo, useRef } from "react";
import WebView, { WebViewProps } from "react-native-webview";
import { EVENT_KEY, ROOT_ID, Message } from "./common";

export const useBridge = <T>(
  app: string,
  onSubscribe: (mes: Message<T>) => void
) => {
  const ref = useRef<WebView>(null);
  const source = useMemo(
    () => ({
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
</head>
<body style="margin: 0 !important;padding: 0 !important;">
  <div id="${ROOT_ID}"></div>
  <script type="text/javascript">(function(){${app}})()</script>
</body>
</html>
`,
    }),
    [app]
  );
  const onMessage: WebViewProps["onMessage"] = useCallback(
    (event: any) => {
      try {
        const res = JSON.parse(event.nativeEvent.data);
        onSubscribe({ type: res.type, data: res.data });
      } catch (e) {
        // NOP
      }
    },
    [onSubscribe]
  );
  const emit = useCallback(
    (mes: Message<T>) => {
      ref.current?.injectJavaScript(`
(function() {
  window.dispatchEvent(
    new CustomEvent(${EVENT_KEY},{detail:${JSON.stringify(mes)}})
  );
  return true;
})()
`);
    },
    [ref]
  );
  return { ref, source, onMessage, emit };
};
