import React from "react";
import { webViewRender } from "react-native-react-bridge/lib/web";
import data from "./assets/example.json";

const App = () => {
  return <div>{JSON.stringify(data)}</div>;
};

export default webViewRender(<App />);
