/**
 * Modules for Preact
 *
 * @module
 */
import { useEffect } from "preact/compat";
import { render, ComponentChild } from "preact";
import { listenNativeMessage, emit, getWebViewRootElement } from "./core";
import type { Message } from "../types";

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
  onSubscribe: (message: Message<T>) => void
) => {
  useEffect(() => listenNativeMessage(onSubscribe), [onSubscribe]);
};

export { emit };
