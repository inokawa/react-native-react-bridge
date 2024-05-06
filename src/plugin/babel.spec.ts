import { readFile } from "node:fs/promises";
import * as path from "node:path";
import { describe, it, expect } from "vitest";
import { isEntryFile } from "./babel";

const readFixture = (filename: string) =>
  readFile(path.join(process.cwd(), "fixtures", filename), "utf-8");

describe("isEntryFile", () => {
  it("webViewRender(App)", async () => {
    const filename = "app-export-non.jsx";
    const src = await readFixture(filename);
    const paths = isEntryFile(src, filename);
    expect(paths).toEqual(false);
  });

  it("export default webViewRender(App)", async () => {
    const filename = "app-export-default.jsx";
    const src = await readFixture(filename);
    const paths = isEntryFile(src, filename);
    expect(paths).toEqual(true);
  });

  it("export const foo = webViewRender(App)", async () => {
    const filename = "app-export-named.jsx";
    const src = await readFixture(filename);
    const paths = isEntryFile(src, filename);
    expect(paths).toEqual(false);
  });

  it("module.exports = webViewRender(App)", async () => {
    const filename = "app-export-commonjs.jsx";
    const src = await readFixture(filename);
    const paths = isEntryFile(src, filename);
    expect(paths).toEqual(false);
  });

  it("export default webViewRender(App) (tsx)", async () => {
    const filename = "app-export-default.tsx";
    const src = await readFixture(filename);
    const paths = isEntryFile(src, filename);
    expect(paths).toEqual(true);
  });

  it("export default webViewRender(App) (preact)", async () => {
    const filename = "app-export-default-preact.jsx";
    const src = await readFixture(filename);
    const paths = isEntryFile(src, filename);
    expect(paths).toEqual(true);
  });

  it("export default webViewRender(App) (react-native-web)", async () => {
    const filename = "app-export-default-web.jsx";
    const src = await readFixture(filename);
    const paths = isEntryFile(src, filename);
    expect(paths).toEqual(true);
  });

  it("export default webViewRender(App) (react createRoot)", async () => {
    const filename = "app-export-default-react.jsx";
    const src = await readFixture(filename);
    const paths = isEntryFile(src, filename);
    expect(paths).toEqual(true);
  });
});
