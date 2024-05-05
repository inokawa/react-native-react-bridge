import * as path from "node:path";
import * as vm from "node:vm";
import { jest, describe, it, expect } from "@jest/globals";
import { bundle } from "./metro";
import { buildWebEntryModule } from "./html";

const resolvePath = (filename: string) =>
  path.join(__dirname, "../../fixtures", filename);

jest.setTimeout(30000);

const runInVmContext = (code: string) => {
  const context = vm.createContext({});

  vm.runInContext(
    buildWebEntryModule(code)
      // vm does not support esm yet
      .replace(/^export default /, ""),
    context
  );
};

describe("bundle", () => {
  it("default", async () => {
    const filename = "app-export-default.jsx";
    const filePath = resolvePath(filename);
    const res = await bundle(filePath);
    expect(res).toMatchSnapshot();

    runInVmContext(res);
  });

  it("default (tsx)", async () => {
    const filename = "app-export-default.tsx";
    const filePath = resolvePath(filename);
    const res = await bundle(filePath);
    expect(res).toMatchSnapshot();

    runInVmContext(res);
  });

  it("with json", async () => {
    const filename = "app-export-default-with-json.jsx";
    const filePath = resolvePath(filename);
    const res = await bundle(filePath);
    expect(res).toMatchSnapshot();

    runInVmContext(res);
  });

  it("with txt", async () => {
    const filename = "app-export-default-with-txt.jsx";
    const filePath = resolvePath(filename);
    const res = await bundle(filePath);
    expect(res).toMatchSnapshot();

    runInVmContext(res);
  });

  it("with md", async () => {
    const filename = "app-export-default-with-md.jsx";
    const filePath = resolvePath(filename);
    const res = await bundle(filePath);
    expect(res).toMatchSnapshot();

    runInVmContext(res);
  });

  it("with images", async () => {
    const filename = "app-export-default-with-images.jsx";
    const filePath = resolvePath(filename);
    const res = await bundle(filePath);
    expect(res).toMatchSnapshot();

    runInVmContext(res);
  });

  it("with html", async () => {
    const filename = "app-export-default-with-html.jsx";
    const filePath = resolvePath(filename);
    const res = await bundle(filePath);
    expect(res).toMatchSnapshot();

    runInVmContext(res);
  });

  it("with wasm", async () => {
    const filename = "app-export-default-with-wasm.jsx";
    const filePath = resolvePath(filename);
    const res = await bundle(filePath);
    expect(res).toMatchSnapshot();

    runInVmContext(res);
  });

  it("with backticks", async () => {
    const filename = "app-export-default-with-backticks.jsx";
    const filePath = resolvePath(filename);
    const res = await bundle(filePath);
    expect(res).toMatchSnapshot();

    runInVmContext(res);
  });

  it("default (preact)", async () => {
    const filename = "app-export-default-preact.jsx";
    const filePath = resolvePath(filename);
    const res = await bundle(filePath);
    expect(res).toMatchSnapshot();

    runInVmContext(res);
  });
});
