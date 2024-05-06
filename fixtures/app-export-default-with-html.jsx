import React from "react";
import { webViewRender } from "react-native-react-bridge/lib/web";
import html from "./assets/example.html";

const App = () => {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export default webViewRender(<App />);
