import { useEffect } from "preact/compat";
import { render, ComponentChild } from "preact";
import { buildRender, buildUseSubscribe } from "./bridge";

export const webViewRender = buildRender<ComponentChild>(render);

export { emit } from "./bridge";

export const useSubscribe = buildUseSubscribe(useEffect);
