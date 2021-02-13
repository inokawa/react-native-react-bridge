import React from "react";
import { webViewRender } from "react-native-react-bridge/lib/web";
import Comp from "./Component";
import wasm from "./example.wasm";
alert(wasm);

const App = () => {
  return <Comp />;
};

export default webViewRender(App);
