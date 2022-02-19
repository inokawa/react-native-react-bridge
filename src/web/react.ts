import { ReactNode, useEffect } from "react";
import { render } from "react-dom";
import { buildRender, buildUseNativeMessage } from "./bridge";

export const webViewRender = buildRender<ReactNode>(render);

export { emit } from "./bridge";

export const useNativeMessage = buildUseNativeMessage(useEffect);
