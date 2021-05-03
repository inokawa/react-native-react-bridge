import { useEffect } from "preact/compat";
import { render } from "preact";
import { buildRender, buildUseSubscribe } from "./bridge";

export const webViewRender = buildRender(render);

export { emit } from "./bridge";

export const useSubscribe = buildUseSubscribe(useEffect);
