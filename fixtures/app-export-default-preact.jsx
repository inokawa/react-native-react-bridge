import { webViewRender } from "react-native-react-bridge/lib/web/preact";
import Comp from "./components/Component-preact";

const App = () => {
  return <Comp />;
};

export default webViewRender(<App />);
