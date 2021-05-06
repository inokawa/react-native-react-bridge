import { ReactNode, useEffect } from "react";
import { render } from "react-dom";
import { buildRender, buildUseSubscribe } from "./bridge";

export const webViewRender = buildRender<ReactNode>(render);

export { emit } from "./bridge";

export const useSubscribe = buildUseSubscribe(useEffect);
