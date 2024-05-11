import { TO_WEB_EVENT_KEY, WEB_ROOT_ID } from "../constants";
import type { ReactNativeMessage, WebViewMessage } from "../types";

/**
 * @internal
 */
export const getWebViewRootElement = (): HTMLElement =>
  document.getElementById(WEB_ROOT_ID)!;

/**
 * A function to send a message to React Native.
 */
export const emitToNative = <T>(message: WebViewMessage<T>) => {
  (window as any).ReactNativeWebView.postMessage(JSON.stringify(message));
};

/**
 * @internal
 */
export const listenNativeMessage = <T>(
  onSubscribe: (message: ReactNativeMessage<T>) => void
) => {
  const listener = (e: any) => {
    onSubscribe({ type: e.detail.type, data: e.detail.data });
  };
  window.addEventListener(TO_WEB_EVENT_KEY, listener);
  return () => {
    window.removeEventListener(TO_WEB_EVENT_KEY, listener);
  };
};
