import { useCallback, useRef } from "react";
import type WebView from "react-native-webview";
import type { WebViewMessageEvent, WebViewProps } from "react-native-webview";
import { TO_WEB_EVENT_KEY } from "../constants";
import type { ReactNativeMessage, WebViewMessage } from "../types";

/**
 * @internal
 */
export const buildEmitToWebView = <T>(
  message: ReactNativeMessage<T>
): string => {
  return `(function() {
  try {
    window.dispatchEvent(new CustomEvent("${TO_WEB_EVENT_KEY}",{detail:${JSON.stringify(
    message
  )}}));
  } catch(e) {
    // NOP
  }
  return true;
  })()`;
};

/**
 * A hook to subscribe messages from WebView.
 */
export const useWebViewMessage = <T>(
  onSubscribe: (message: WebViewMessage<T>) => void
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
    (message: ReactNativeMessage<T>) => {
      ref.current?.injectJavaScript(buildEmitToWebView(message));
    },
    [ref]
  );
  return { ref, onMessage, emit };
};
