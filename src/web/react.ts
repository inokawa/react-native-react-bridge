/**
 * Modules for React DOM
 *
 * @module
 */
import { ReactNode, useEffect } from "react";
import { render } from "react-dom";
import { buildRender, buildUseNativeMessage, emit } from "./core";

export const webViewRender = buildRender<ReactNode>(render);

export const useNativeMessage = buildUseNativeMessage(useEffect);

export { emit };
