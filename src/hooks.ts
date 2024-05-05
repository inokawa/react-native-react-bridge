import { useCallback, useRef } from "react";
import type WebView from "react-native-webview";
import type { WebViewMessageEvent, WebViewProps } from "react-native-webview";
import { EVENT_KEY } from "./common";
import type { Message } from "./types";

/**
 * A hook to subscribe messages from WebView.
 */
export const useWebViewMessage = <T>(
  onSubscribe: (message: Message<T>) => void
) => {
  const ref = useRef<WebView>(null);
  const onMessage: WebViewProps["onMessage"] = useCallback(
    (event: WebViewMessageEvent) => {
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
  return { ref, onMessage, emit };
};
