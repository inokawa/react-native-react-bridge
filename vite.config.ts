
import pkg from "./package.json" with { type: "json" };
import { extname, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

const external = (id: string) =>
  [
    "metro",
    "metro-react-native-babel-transformer",
    "@react-native/metro-babel-transformer",
    "@expo/metro-config/babel-transformer",
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
  ].some((d) => id.startsWith(d));

export default defineConfig({
  build: {
    outDir: "./lib",
    lib: {
      entry: Object.fromEntries(
        ["src/index.ts", "src/web/index.ts", "src/web/preact.ts", "src/plugin/index.ts",].map((file) => [
          relative('./src', file.slice(0, file.length - extname(file).length)),
          fileURLToPath(new URL(file, import.meta.url)),
        ]),
      ),
      formats: ["es", "cjs"],
      fileName: (f, entryName) => entryName + "." + (f === "es" ? "mjs" : "js"),
    },
    rolldownOptions: {
      external
    },
    sourcemap: true,
  },
  plugins: [dts({ exclude: ["**/*.{spec,stories}.*"] })],
});
