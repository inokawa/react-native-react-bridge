import { webViewRender } from "react-native-react-bridge/lib/web";

let Root = () => {
  // prettier-ignore
  let issue = function inspect(value) {
    switch (typeof value) {
      case 'string':
        if (value.includes("'")) {
          if (!value.includes('"')) {
            return `"${value}"`;
          } else if (!value.includes('`') && !value.includes('${')) {
            return `\`${value}\``;
          }
        }
    }
  };
  console.log(issue);

  return <div>dummy</div>;
};

export default webViewRender(<Root />);
