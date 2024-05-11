/**
 * Modules for Preact
 *
 * @module
 */
import { useEffect } from "preact/compat";
import { render, ComponentChild } from "preact";
import {
  listenNativeMessage,
  emitToNative,
  getWebViewRootElement,
} from "./core";
import type { ReactNativeMessage } from "../types";

/**
 * The entry point of web file
 *
 * This statement is detected by babelTransformer as an entry point
 * All dependencies are resolved, compressed and stringified into one file
 */
export const webViewRender = (root: ComponentChild): string => {
  render(root, getWebViewRootElement());
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
