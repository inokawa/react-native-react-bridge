/**
 * Modules for React DOM
 *
 * @module
 */
import { ReactElement, useEffect } from "react";
import { render } from "react-dom";
import { emit, getWebViewRootElement, listenNativeMessage } from "./core";
import type { Message } from "../types";

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
 * A hook to subscribe messages from React Native.
 */
export const useNativeMessage = <T>(
  onSubscribe: (message: Message<T>) => void
) => {
  useEffect(() => listenNativeMessage(onSubscribe), [onSubscribe]);
};

export { emit };
