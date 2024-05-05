import { EVENT_KEY, ROOT_ID } from "../constants";
import type { Message } from "../types";

/**
 * @internal
 */
export const getWebViewRootElement = (): HTMLElement =>
  document.getElementById(ROOT_ID)!;

/**
 * A function to send a message to React Native
 */
export const emit = <T>(message: Message<T>) => {
  (window as any).ReactNativeWebView.postMessage(JSON.stringify(message));
};

/**
 * @internal
 */
export const listenNativeMessage = <T>(
  onSubscribe: (message: Message<T>) => void
) => {
  const listener = (e: any) => {
    if (!isMessageEvent<T>(e)) return;
    onSubscribe({ type: e.detail.type, data: e.detail.data });
  };
  window.addEventListener(EVENT_KEY, listener);
  return () => {
    window.removeEventListener(EVENT_KEY, listener);
  };
};

const isMessageEvent = <T>(e: any): e is { detail: Message<T> } =>
  e && e.detail;
