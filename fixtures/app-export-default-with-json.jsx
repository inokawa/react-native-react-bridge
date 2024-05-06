import React from "react";
import { webViewRender } from "react-native-react-bridge/lib/web";
import Comp from "./components/Component";
import data from "./assets/example.json";

alert(data);

const App = () => {
  return <Comp />;
};

export default webViewRender(<App />);
