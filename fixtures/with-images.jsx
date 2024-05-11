import React from "react";
import { webViewRender } from "react-native-react-bridge/lib/web";
import bmp from "./assets/twitter.bmp";
import gif from "./assets/twitter.gif";
import png from "./assets/twitter.png";
import jpg from "./assets/twitter.jpg";
import jpeg from "./assets/twitter.jpeg";
import webp from "./assets/twitter.webp";
import svg from "./assets/twitter.svg";

const App = () => {
  return (
    <div>
      <img src={bmp} />
      <img src={gif} />
      <img src={png} />
      <img src={jpg} />
      <img src={jpeg} />
      <img src={webp} />
      <img src={svg} />
    </div>
  );
};

export default webViewRender(<App />);
