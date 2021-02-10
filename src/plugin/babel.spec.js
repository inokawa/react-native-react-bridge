import * as fs from "fs";
import * as path from "path";
import { isEntryFile } from "./babel";
import { createContent } from "./html";

const readFixture = (filename) =>
  fs.readFileSync(path.join(__dirname, "../../fixtures", filename), "utf-8");

describe("isEntryFile", () => {
  it("webViewRender(App)", () => {
    const filename = "app-export-non.jsx";
    const src = readFixture(filename);
    const paths = isEntryFile(src, filename);
    expect(paths).toEqual(false);
  });

  it("export default webViewRender(App)", () => {
    const filename = "app-export-default.jsx";
    const src = readFixture(filename);
    const paths = isEntryFile(src, filename);
    expect(paths).toEqual(true);
  });

  it("export const foo = webViewRender(App)", () => {
    const filename = "app-export-named.jsx";
    const src = readFixture(filename);
    const paths = isEntryFile(src, filename);
    expect(paths).toEqual(false);
  });

  it("module.exports = webViewRender(App)", () => {
    const filename = "app-export-commonjs.jsx";
    const src = readFixture(filename);
    const paths = isEntryFile(src, filename);
    expect(paths).toEqual(false);
  });
});

describe("createContent", () => {
  it("export default webViewRender(App)", () => {
    const filename = "app-export-default.jsx";
    const src = readFixture(filename);
    expect(createContent(src)).toMatchSnapshot();
  });
});
