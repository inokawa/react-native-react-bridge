import React from "preact";
import { webViewRender } from "react-native-react-bridge/lib/web/preact";
import Comp from "./Component-preact";
import './example.css'

const App = () => {
  return <Comp />;
};

export default webViewRender(App);
