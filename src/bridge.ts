import { useCallback, useMemo, useRef } from "react";
import WebView, { WebViewProps } from "react-native-webview";
import { EVENT_KEY, ROOT_ID } from "./common";
import { Message } from "./types";

export const useBridge = <T>(
  app: string,
  onSubscribe: (message: Message<T>) => void
) => {
  const ref = useRef<WebView>(null);
  const source = useMemo(
    () => ({
      html: app,
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
    (message: Message<T>) => {
      ref.current?.injectJavaScript(`
(function() {
try { 
  window.dispatchEvent(
    new CustomEvent("${EVENT_KEY}",{detail:${JSON.stringify(message)}})
  );
} catch(e) {
  // NOP
}
return true;
})()
`);
    },
    [ref]
  );
  return { ref, source, onMessage, emit };
};
