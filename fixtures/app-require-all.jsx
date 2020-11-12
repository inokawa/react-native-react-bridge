const React = require("react");
const RNR = require("react-native-react-bundler");

const Comp = RNR.bundleReact("./Component");

const App = () => {
  return <RNR.RNDOM app={Comp} />;
};
