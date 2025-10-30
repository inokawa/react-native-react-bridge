import { RefObject, useCallback } from "react";
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
  return useCallback(
    ((event: WebViewMessageEvent) => {
      try {
        const res = JSON.parse(event.nativeEvent.data);
        onSubscribe({ type: res.type, data: res.data });
      } catch (e) {
        // NOP
      }
    }) satisfies WebViewProps["onMessage"],
    [onSubscribe]
  );
};

/**
 * A function to send a message to WebView.
 */
export const emitToWebView = <T>(
  ref: RefObject<WebView>,
  message: ReactNativeMessage<T>
) => {
  ref.current?.injectJavaScript(buildEmitToWebView(message));
};
