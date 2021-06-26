import React from "react";
import { webViewRender } from "react-native-react-bridge/lib/web";
import Comp from "./Component";
import "./example.css";

const text = "foo `bar`";
console.log(text);

const App = () => {
  return <Comp />;
};

export default webViewRender(App);
