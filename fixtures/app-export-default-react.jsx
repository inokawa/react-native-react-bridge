import React from "react";
import { webViewCreateRoot } from "react-native-react-bridge/lib/web";
import Comp from "./Component";
import "./example.css";

const App = () => {
  return <Comp />;
};

export default webViewCreateRoot(<App />);
