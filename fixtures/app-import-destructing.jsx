import React from "react";
import { bundleReact, RNDOM } from "react-native-react-bundler";

const Comp = bundleReact("./Component");

const App = () => {
  return <RNDOM app={Comp} />;
};
