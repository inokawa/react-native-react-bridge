const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.transformer.babelTransformerPath = require.resolve(
  "react-native-react-bridge/lib/plugin"
);

module.exports = config;
