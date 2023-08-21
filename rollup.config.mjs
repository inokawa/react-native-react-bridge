import typescript from "@rollup/plugin-typescript";
import path from "path";
import pkg from "./package.json" assert { type: "json" };

const mainDir = path.dirname(pkg.main);
const moduleDir = path.dirname(pkg.module);

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: pkg.main,
        format: "cjs",
      },
      {
        file: pkg.module,
        format: "es",
      },
    ],
    plugins: [
      typescript({
        tsconfig: "./tsconfig.json",
        outDir: ".",
        declaration: true,
        exclude: ["src/**/*.spec.*"],
      }),
    ],
  },
  {
    input: "src/web/index.ts",
    output: [
      {
        file: `${mainDir}/web/index.js`,
        format: "cjs",
      },
      {
        file: `${moduleDir}/web/index.mjs`,
        format: "es",
      },
    ],
    plugins: [typescript()],
  },
  {
    input: "src/web/preact.ts",
    output: [
      {
        file: `${mainDir}/web/preact.js`,
        format: "cjs",
      },
      {
        file: `${moduleDir}/web/preact.mjs`,
        format: "es",
      },
    ],
    plugins: [typescript()],
  },
  {
    input: "src/plugin/index.js",
    output: [
      {
        file: `${mainDir}/plugin/index.js`,
        format: "cjs",
        // https://github.com/inokawa/react-native-react-bridge/issues/126
        interop: "auto",
      },
    ],
  },
  {
    input: "src/plugin/transformer.js",
    output: [
      {
        file: `${mainDir}/plugin/transformer.js`,
        format: "cjs",
      },
    ],
  },
];
