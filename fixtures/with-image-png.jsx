import React from "react";
import { webViewRender } from "react-native-react-bridge/lib/web";
import url from "./assets/twitter.png";

const App = () => {
  return (
    <div>
      <img src={url} />
    </div>
  );
};

export default webViewRender(<App />);
