import * as fs from "fs";
import * as path from "path";
import { extractEntryPaths, replaceEntryPaths } from "./babel";

const readFixture = (filename) =>
  fs.readFileSync(path.join(__dirname, "../fixtures", filename), "utf-8");

describe("extractEntryPaths", () => {
  it("import { bundleReact }", () => {
    const filename = "app-import-destructing.jsx";
    const src = readFixture(filename);
    const paths = extractEntryPaths(src, filename);
    expect(paths).toEqual(["./Component"]);
  });

  it("import all", () => {
    const filename = "app-import-all.jsx";
    const src = readFixture(filename);
    const paths = extractEntryPaths(src, filename);
    expect(paths).toEqual(["./Component"]);
  });

  it("require { bundleReact }", () => {
    const filename = "app-require-destructing.jsx";
    const src = readFixture(filename);
    const paths = extractEntryPaths(src, filename);
    expect(paths).toEqual(["./Component"]);
  });

  it("require all", () => {
    const filename = "app-require-all.jsx";
    const src = readFixture(filename);
    const paths = extractEntryPaths(src, filename);
    expect(paths).toEqual(["./Component"]);
  });
});

describe("replaceEntryPaths", () => {
  it("import { bundleReact }", () => {
    const filename = "app-import-destructing.jsx";
    const src = readFixture(filename);
    const res = replaceEntryPaths(src, filename, {
      "./Component": "REPLACED",
    });
    expect(res.code).toMatchSnapshot();
  });

  it("import all", () => {
    const filename = "app-import-all.jsx";
    const src = readFixture(filename);
    const res = replaceEntryPaths(src, filename, {
      "./Component": "REPLACED",
    });
    expect(res.code).toMatchSnapshot();
  });

  it("require { bundleReact }", () => {
    const filename = "app-require-destructing.jsx";
    const src = readFixture(filename);
    const res = replaceEntryPaths(src, filename, {
      "./Component": "REPLACED",
    });
    expect(res.code).toMatchSnapshot();
  });

  it("require all", () => {
    const filename = "app-require-all.jsx";
    const src = readFixture(filename);
    const res = replaceEntryPaths(src, filename, {
      "./Component": "REPLACED",
    });
    expect(res.code).toMatchSnapshot();
  });
});
