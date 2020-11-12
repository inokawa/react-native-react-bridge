const wrap = (code, compName) => `
import ReactDOM from 'react-dom';

${code}

const postMessage = (...args) => {
  window.ReactNativeWebView.postMessage({ _fn: 'hoge', ...args });
};

const Root = () => {
  // const [state, dispatch] = React.useReducer(reducer, initialArg, init);
  // const [state, setState] = React.useState({});

  React.useEffect(() => {
    // const event = new Event('RN');
    // window.dispatchEvent(event);
    const fn = (e) => {
      // TODO
      // setState(e.todo);
    };
    window.addEventListener('RN', fn);
    return () => {
      window.removeEventListener('RN', fn);
    };
  }, []);

  return React.createElement(${compName}, {
    fromRN: state,
    toRN: postMessage,
  }, []);
};

ReactDOM.render(React.createElement(Root, {}, []), "root");
`;

const transformer = (entryPath) => `
const metroTransformer = require("metro-react-native-babel-transformer");
const wrap = ${wrap.toString()};

module.exports.transform = (args) => {
  const { filename, src, options } = args;
  if ("${entryPath}".endsWith(filename)) {
    return metroTransformer.transform({ ...args, src: wrap(src, "App") });
  }
  return metroTransformer.transform({ ...args, src });
}`;

module.exports = { wrap, transformer };
