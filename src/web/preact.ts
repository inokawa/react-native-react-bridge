import { useEffect } from "preact/compat";
import { render, ComponentChild } from "preact";
import { buildRender, buildUseNativeMessage } from "./bridge";

export const webViewRender = buildRender<ComponentChild>(render);

export { emit } from "./bridge";

export const useNativeMessage = buildUseNativeMessage(useEffect);
