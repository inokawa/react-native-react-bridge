import { EVENT_KEY, ROOT_ID } from "../common";
import { Message } from "../types";

export const buildRender = <T>(render: (...args: any[]) => any) => {
  return (root: T): string => {
    render(root, document.getElementById(ROOT_ID));
    return ""; // dummy
  };
};

export const emit = <T>(message: Message<T>) => {
  (window as any).ReactNativeWebView.postMessage(JSON.stringify(message));
};

export const buildUseSubscribe = (useEffect: any) => {
  return <T>(onSubscribe: (message: Message<T>) => void) => {
    useEffect(() => {
      const listener = (e: any) => {
        if (!isMessageEvent<T>(e)) return;
        onSubscribe({ type: e.detail.type, data: e.detail.data });
      };
      window.addEventListener(EVENT_KEY, listener);
      return () => {
        window.removeEventListener(EVENT_KEY, listener);
      };
    }, [onSubscribe]);
  };
};

const isMessageEvent = <T>(e: any): e is { detail: Message<T> } =>
  e && e.detail;
