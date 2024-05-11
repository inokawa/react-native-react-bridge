import React from "react";
import { webViewCreateRoot } from "react-native-react-bridge/lib/web";
import Comp from "./components/Component";

const App = () => {
  return <Comp />;
};

export default webViewCreateRoot(<App />);
