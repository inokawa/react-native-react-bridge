# react-native-react-bridge

![npm](https://img.shields.io/npm/v/react-native-react-bridge) ![npm](https://img.shields.io/npm/dw/react-native-react-bridge) ![check](https://github.com/inokawa/react-native-react-bridge/workflows/check/badge.svg)

An easy way to integrate your [React](https://github.com/facebook/react) (or [Preact](https://github.com/preactjs/preact)) app into [React Native](https://github.com/facebook/react-native) app with WebView.

## Why?

If you'd like to run your React web app in React Native, rewriting it for React Native or using [react-native-web](https://github.com/necolas/react-native-web) is preferred way in most cases.
But sometimes rewriting is overkill, when you are just prototyping, or when the app includes something not available on React Native, like rich text editor with contenteditable or complicated logic with WebAssembly.

So how we run React app in React Native app as it is? It's logically possible if you run your web code in WebView using [react-native-webview](https://github.com/react-native-webview/react-native-webview).
However bundling React code with React Native is troublesome and implementing communication between React Native and WebView is so hard.

This library gives a bridge to make it easy.
This will bundle the whole React app by some additional codes and it will be automatically re-compiled if you edit it.
You rarely need to think which code you are editing for React or React Native, like isomorphic.
The communication between React app and React Native app will be also simplified by this.

<img src="./examples/ios.gif" height="500px" /> <img src="./examples/android.gif" height="500px" />

## Features

- Create React (or Preact) app bundle for WebView automatically in build process of React Native
  - `.js`, `.ts`, `.jsx`, `.tsx`, `.mjs` and `.cjs` will be packed into one source.
  - **NOTE: Only the edits in the entry file of web will invoke rebuild because of the limitation of [metro](https://github.com/facebook/metro)'s build process.**
- Handle communication between React Native and WebView with React hook style
  - With `useWebViewMessage` hook, you can subscribe messages from WebView.
  - With `useNativeMessage` hook, you can subscribe messages from React Native.
  - `emit` function sends message.
- Support bundling some assets in web side with [ES6 import syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)
  - `.json` is imported as an object, like require in Node.js.
  - `.txt` and `.md` are imported as string, like [raw-loader](https://github.com/webpack-contrib/raw-loader).
  - `.css` is injected to the HTML head of WebView, like [css-loader](https://github.com/webpack-contrib/css-loader) with [style-loader](https://github.com/webpack-contrib/style-loader).
  - `.bmp`, `.gif`, `.png`, `.jpg`, `.jpeg`, `.webp` and `.svg` are loaded as base64 encoded url, like [url-loader](https://github.com/webpack-contrib/url-loader).
  - `.htm` and `.html` are loaded as string, which can be rendered with React's [dangerouslySetInnerHTML](https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml).
  - `.wasm` is imported like [Node.js](https://nodejs.org/api/esm.html#esm_wasm_modules), which is compatible with [ES Module Integration Proposal for WebAssembly](https://github.com/WebAssembly/esm-integration).

If you have some feature requests or improvements, please create a [issue](https://github.com/inokawa/react-native-react-bridge/issues) or [PR](https://github.com/inokawa/react-native-react-bridge/pulls).

## Install

```sh
npm install react-native-react-bridge react-native-webview

# Necessary only if you render React app in WebView
npm install react-dom

# Necessary only if you render Preact app in WebView
npm install preact
```

### Requirements

- react >= 16.8
- react-native >= 0.60
- (preact >= 10.0)

### Supported react-native versions

| react-native-react-bridge | react-native |
| ------------------------- | ------------ |
| >=0.9.0                   | >=0.65.0     |
| 0.0.0 - 0.8.1             | <=0.64.2     |

## Usage

### 1. Fix `metro.config.js` to use babelTransformer from this library.

#### React Native

```javascript
module.exports = {
  transformer: {
    // This detects entry points of React app and transforms them
    // For the other files this will switch to use default `metro-react-native-babel-transformer` for transforming
    babelTransformerPath: require.resolve('react-native-react-bridge/lib/plugin'),
    ...
  },
  rnrb: {
    // Set `true` if you use Preact in web side.
    // This will alias imports from `react` and `react-dom` to `preact/compat` automatically.
    preact: true
  },
  ...
};
```

#### Expo

```javascript
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

module.exports = {
  ...config,
  transformer: {
    ...config.transformer,
    babelTransformerPath: require.resolve(
      "react-native-react-bridge/lib/plugin"
    ),
  },
};
```

### 2. Make entry file for web app.

- If you use React in web, import modules from `react` and `react-native-react-bridge/lib/web`.
- If you use Preact in web, import modules from `preact` and `react-native-react-bridge/lib/web/preact`.
- If you use Preact in web but with React aliases, import modules from `react` and `react-native-react-bridge/lib/web`.

```jsx
// WebApp.js

import React, { useState } from "react";
import {
  webViewRender,
  emit,
  useNativeMessage,
} from "react-native-react-bridge/lib/web";
// Importing css is supported
import "./example.css";
// Images are loaded as base64 encoded string
import image from "./foo.png";

const Root = () => {
  const [data, setData] = useState("");
  // useNativeMessage hook receives message from React Native
  useNativeMessage((message) => {
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

### 3. Use the entry file in your React Native app with WebView.

```jsx
// App.js

import React from "react";
import WebView from "react-native-webview";
import { useWebViewMessage } from "react-native-react-bridge";
import webApp from "./WebApp";

const App = () => {
  // useWebViewMessage hook create props for WebView and handle communication
  // The argument is callback to receive message from React
  const { ref, onMessage, emit } = useWebViewMessage((message) => {
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
      // Pass the source code of React app
      source={{ html: webApp }}
      onMessage={onMessage}
    />
  );
};
```

### 4. Start your React Native app!

## Documentation

- [API reference](./docs/API.md)

### FAQs

#### My webview displays a blank page.

react-native-webview has some ways to show errors occurred in webview. This may be helpful to troubleshoot it.

https://github.com/react-native-webview/react-native-webview/blob/master/docs/Reference.md#onerror

## Demo

This repository includes demo app.

### React Native

Before running this app, please prepare environment for React Native (https://reactnative.dev/docs/environment-setup).

```sh
git clone git@github.com:inokawa/react-native-react-bridge.git
cd examples/DemoApp
yarn
yarn ios # or yarn android
```

### Expo

```sh
git clone git@github.com:inokawa/react-native-react-bridge.git
cd examples/DemoAppExpo
yarn
expo start
```

## Contribute

All contributions are welcome.
If you find a problem, feel free to create an [issue](https://github.com/inokawa/react-native-react-bridge/issues) or a [PR](https://github.com/inokawa/react-native-react-bridge/pulls).

### Making a Pull Request

1. Fork this repo.
2. Run `npm install`.
3. Commit your fix.
4. Make a PR and confirm all the CI checks passed.
