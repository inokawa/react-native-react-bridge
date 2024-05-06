import React from "react";
import { webViewRender } from "react-native-react-bridge/lib/web";
import Comp from "./components/Component";
import data from "./assets/example.txt";

alert(data);

const App = () => {
  return <Comp />;
};

export default webViewRender(<App />);
