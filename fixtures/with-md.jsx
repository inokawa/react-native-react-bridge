import React from "react";
import { webViewRender } from "react-native-react-bridge/lib/web";
import data from "./assets/example.md";

const App = () => {
  return <div>{data}</div>;
};

export default webViewRender(<App />);
