const React = require("react");
const { bundleReact, RNDOM } = require("react-native-react-bundler");

const Comp = bundleReact("./Component");

const App = () => {
  return <RNDOM app={Comp} />;
};
