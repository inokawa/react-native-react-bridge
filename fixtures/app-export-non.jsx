import React from "react";
import { webViewRender } from "react-native-react-bridge/lib/web";
import Comp from "./components/Component";

const App = () => {
  return <Comp />;
};

webViewRender(<App />);
