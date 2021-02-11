# react-native-react-bridge

![npm](https://img.shields.io/npm/v/react-native-react-bridge) ![check](https://github.com/inokawa/react-native-react-bridge/workflows/check/badge.svg)

An easy way to integrate your [React](https://github.com/facebook/react) app into [React Native](https://github.com/facebook/react-native) app with WebView.

## Why?

Run React app in React Native app is logically possible if you run your web code in WebView using [react-native-webview](https://github.com/react-native-webview/react-native-webview).
However bundling React code with React Native is troublesome and implementing communication between React Native and WebView is so hard.

This library gives a bridge to make it easy.
This will bundle the whole React app by some additional codes and it will be automatically re-compiled if you edit it.
You rarely need to think which code you are editing for React or React Native, like isomorphic.
The communication between React app and React Native app will be also simplified by this.

<img src="./examples/ios.gif" height="500px" /> <img src="./examples/android.gif" height="500px" />

## Features

- Create React app bundle for WebView automatically in build process of React Native
  - `.js`, `.ts`, `.jsx`, `.tsx` will be packed into one source.
- Handle communication between React Native and WebView with React hook style
- Support bundling some assets in web side with ES6 import syntax
  - `.json` is imported as an object, like require in Node.js.
  - `.css` is injected to the HTML head of WebView, like [css-loader](https://github.com/webpack-contrib/css-loader).
  - `.bmp`, `.gif`, `.png`, `.jpg`, `.jpeg`, `.webp` and `.svg` are loaded as base64 encoded url, like [url-loader](https://github.com/webpack-contrib/url-loader).
  - `.htm` and `.html` are loaded as string, which can be rendered with React's dangerouslySetInnerHTML.

If you have some feature requests or improvements, please create a [issue](https://github.com/inokawa/react-native-react-bridge/issues) or [PR](https://github.com/inokawa/react-native-react-bridge/pulls).

## Install

```sh
npm install react-native-react-bridge

# These are used to render React app in WebView
npm install react-dom react-native-webview
```

### Requirements

- react 16.8+
- react-native 0.60+

## Usage

1. Fix `metro.config.js` to use babelTransformer from this library.

```javascript
module.exports = {
  transformer: {
    // This detects entry points of React app and transforms them
    // For the other files this will switch to use default `metro-react-native-babel-transformer` for transforming
    babelTransformerPath: require.resolve('react-native-react-bridge/lib/plugin'),
    ...
  },
};
```

2. Make entry file for React app.

```jsx
// WebApp.js

import React, { useState } from "react";
import {
  webViewRender,
  emit,
  useSubscribe,
} from "react-native-react-bridge/lib/web";
// Importing css is supported
import "./example.css";
// Images are loaded as base64 encoded string
import image from "./foo.png";

const Root = () => {
  const [data, setData] = useState("");
  // useSubscribe hook receives message from React Native
  useSubscribe((message) => {
    if (message.type === "success") {
      setData(message.data);
    }
  });
  return (
    <div>
      <img src={image} />
      <div>{data}</div>
      <button
        onClick={() => {
          // emit sends message to React Native
          //   type: event name
          //   data: some data which will be serialized by JSON.stringify
          emit({ type: "hello", data: 123 });
        }}
      />
    </div>
  );
};

// This statement is detected by babelTransformer as an entry point
// All dependencies are resolved, compressed and stringified into one file
export default webViewRender(<Root />);
```

3. Use the entry file in your React Native app with WebView.

```jsx
// App.js

import React from "react";
import WebView from "react-native-webview";
import { useBridge } from "react-native-react-bridge";
import webApp from "./WebApp";

const App = () => {
  // useBridge hook create props for WebView and handle communication
  // 1st argument is the source code of React app
  // 2nd argument is callback to receive message from React
  const { ref, source, onMessage, emit } = useBridge(webApp, (message) => {
    // emit sends message to React
    //   type: event name
    //   data: some data which will be serialized by JSON.stringify
    if (message.type === "hello" && message.data === 123) {
      emit({ type: "success", data: "succeeded!" });
    }
  });

  return (
    <WebView
      // ref, source and onMessage must be passed to react-native-webview
      ref={ref}
      source={source}
      onMessage={onMessage}
    />
  );
};
```

4. Start your React Native app!

## Demo

This repository includes demo app.

Before running this app, please prepare environment for React Native (https://reactnative.dev/docs/environment-setup).

```sh
git clone git@github.com:inokawa/react-native-react-bridge.git
cd examples/DemoApp
npm install
npm run ios # or npm run android
```
