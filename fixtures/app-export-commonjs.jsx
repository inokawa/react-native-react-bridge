import React from "react";
import { webViewRender } from "react-native-react-bridge/lib/web";
import Comp from "./Component";

const App = () => {
  return <Comp />;
};

module.exports = webViewRender(<App />);
