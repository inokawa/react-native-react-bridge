import React from "react";
import { webViewRender } from "react-native-react-bridge/lib/web";
import * as wasm from "./assets/add.wasm";

const App = () => {
  let res;
  try {
    res = wasm.add(1, 2);
  } catch (err) {
    res = err.toString();
  }
  return <div>sum: {res}</div>;
};

export default webViewRender(<App />);
