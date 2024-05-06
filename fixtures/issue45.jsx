import React from "react";
import { webViewRender } from "react-native-react-bridge/lib/web";
import Comp from "./components/Component";
import "./assets/example.css";

const text = "foo `bar`";
console.log(text);
console.log(`baz`);

const App = () => {
  return <Comp />;
};

export default webViewRender(<App />);
