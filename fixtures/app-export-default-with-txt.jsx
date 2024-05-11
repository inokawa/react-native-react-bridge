import React from "react";
import { webViewRender } from "react-native-react-bridge/lib/web";
import data from "./assets/example.txt";

const App = () => {
  return <div>{data}</div>;
};

export default webViewRender(<App />);
