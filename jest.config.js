module.exports = {
  rootDir: "./src",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(jsx?|tsx?)$": "ts-jest",
  },
  setupFiles:['../jest-setup.js']
};
