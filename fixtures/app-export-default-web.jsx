import { webViewRender } from "react-native-react-bridge/lib/web";
import Comp from "./components/Component-native";

const App = () => {
  return <Comp />;
};

export default webViewRender(<App />);
