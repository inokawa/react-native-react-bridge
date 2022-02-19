import { useEffect } from "preact/compat";
import { render, ComponentChild } from "preact";
import { buildRender, buildUseNativeMessage, emit } from "./core";

export const webViewRender = buildRender<ComponentChild>(render);

export const useNativeMessage = buildUseNativeMessage(useEffect);

export { emit };
