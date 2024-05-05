import React from "react";
import { webViewRender } from "react-native-react-bridge/lib/web";
import bmp from "./twitter.bmp";
import gif from "./twitter.gif";
import png from "./twitter.png";
import jpg from "./twitter.jpg";
import jpeg from "./twitter.jpeg";
import webp from "./twitter.webp";
import svg from "./twitter.svg";

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
