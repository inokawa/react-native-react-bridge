import React from "react";
import { webViewRender } from "react-native-react-bridge/lib/web";
import Comp from "./Component";

const App = () => {
  return <Comp />;
};

export const foo = webViewRender(App);
