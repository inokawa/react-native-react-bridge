/**
 * Modules for React DOM
 *
 * @module
 */
import { ReactElement, useEffect } from "react";
import { render } from "react-dom";
import { createRoot } from "react-dom/client";
import {
  emitToNative,
  getWebViewRootElement,
  listenNativeMessage,
} from "./core";
import type { ReactNativeMessage } from "../types";

/**
 * The entry point of web file
 *
 * This statement is detected by babelTransformer as an entry point
 * All dependencies are resolved, compressed and stringified into one file
 */
export const webViewRender = (root: ReactElement): string => {
  render(root, getWebViewRootElement());
  return ""; // dummy
};

/**
 * {@link webViewRender} but initiated with React's createRoot
 */
export const webViewCreateRoot = (root: ReactElement): string => {
  createRoot(getWebViewRootElement()).render(root);
  return ""; // dummy
};

/**
 * A hook to subscribe messages from React Native.
 */
export const useNativeMessage = <T>(
  onSubscribe: (message: ReactNativeMessage<T>) => void
) => {
  useEffect(() => listenNativeMessage(onSubscribe), [onSubscribe]);
};

export { emitToNative };
