import React from "react";
import * as RNR from "react-native-react-bundler";

const Comp = RNR.bundleReact("./Component");

const App = () => {
  return <RNR.RNDOM app={Comp} />;
};
