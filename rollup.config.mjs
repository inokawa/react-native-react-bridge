import typescript from "@rollup/plugin-typescript";
import pkg from "./package.json" assert { type: "json" };

const external = (id) =>
  [
    "metro",
    "metro-react-native-babel-transformer",
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
  ].some((d) => id.startsWith(d));

/** @type { import('rollup').RollupOptions[] } */
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
    external,
  },
  {
    input: "src/web/index.ts",
    output: [
      {
        file: pkg.exports["./lib/web"].default,
        format: "cjs",
      },
      {
        file: pkg.exports["./lib/web"].import,
        format: "es",
      },
    ],
    plugins: [typescript()],
    external,
  },
  {
    input: "src/web/preact.ts",
    output: [
      {
        file: pkg.exports["./lib/web/preact"].default,
        format: "cjs",
      },
      {
        file: pkg.exports["./lib/web/preact"].import,
        format: "es",
      },
    ],
    plugins: [typescript()],
    external,
  },
  {
    input: "src/plugin/index.ts",
    output: [
      {
        file: pkg.exports["./lib/plugin"].default,
        format: "cjs",
        // https://github.com/inokawa/react-native-react-bridge/issues/126
        interop: "auto",
      },
    ],
    plugins: [typescript()],
    external,
  },
  {
    input: "src/plugin/transformer.js",
    output: [
      {
        file: pkg.exports["./lib/plugin/transformer"].default,
        format: "cjs",
      },
    ],
    external,
  },
];
