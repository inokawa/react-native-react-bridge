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
    // vm does not support esm yet
    code.replace(/^export default /, ""),
    context
  );
};

describe("bundle", () => {
  it("default", async () => {
    const filename = "app-export-default.jsx";
    const filePath = resolvePath(filename);
    const res = await bundle(filePath);
    expect(res).toMatchSnapshot();

    const bundled = buildWebEntryModule(res);
    expect(bundled).toMatchSnapshot();
    runInVmContext(bundled);
  });

  it("default (tsx)", async () => {
    const filename = "app-export-default.tsx";
    const filePath = resolvePath(filename);
    const res = await bundle(filePath);
    expect(res).toMatchSnapshot();

    const bundled = buildWebEntryModule(res);
    expect(bundled).toMatchSnapshot();
    runInVmContext(bundled);
  });

  it("with json", async () => {
    const filename = "app-export-default-with-json.jsx";
    const filePath = resolvePath(filename);
    const res = await bundle(filePath);
    expect(res).toMatchSnapshot();

    const bundled = buildWebEntryModule(res);
    expect(bundled).toMatchSnapshot();
    runInVmContext(bundled);
  });

  it("with txt", async () => {
    const filename = "app-export-default-with-txt.jsx";
    const filePath = resolvePath(filename);
    const res = await bundle(filePath);
    expect(res).toMatchSnapshot();

    const bundled = buildWebEntryModule(res);
    expect(bundled).toMatchSnapshot();
    runInVmContext(bundled);
  });

  it("with md", async () => {
    const filename = "app-export-default-with-md.jsx";
    const filePath = resolvePath(filename);
    const res = await bundle(filePath);
    expect(res).toMatchSnapshot();

    const bundled = buildWebEntryModule(res);
    expect(bundled).toMatchSnapshot();
    runInVmContext(bundled);
  });

  it("with images", async () => {
    const filename = "app-export-default-with-images.jsx";
    const filePath = resolvePath(filename);
    const res = await bundle(filePath);
    expect(res).toMatchSnapshot();

    const bundled = buildWebEntryModule(res);
    expect(bundled).toMatchSnapshot();
    runInVmContext(bundled);
  });

  it("with html", async () => {
    const filename = "app-export-default-with-html.jsx";
    const filePath = resolvePath(filename);
    const res = await bundle(filePath);
    expect(res).toMatchSnapshot();

    const bundled = buildWebEntryModule(res);
    expect(bundled).toMatchSnapshot();
    runInVmContext(bundled);
  });

  it("with wasm", async () => {
    const filename = "app-export-default-with-wasm.jsx";
    const filePath = resolvePath(filename);
    const res = await bundle(filePath);
    expect(res).toMatchSnapshot();

    const bundled = buildWebEntryModule(res);
    expect(bundled).toMatchSnapshot();
    runInVmContext(bundled);
  });

  it("with backticks", async () => {
    const filename = "app-export-default-with-backticks.jsx";
    const filePath = resolvePath(filename);
    const res = await bundle(filePath);
    expect(res).toMatchSnapshot();

    const bundled = buildWebEntryModule(res);
    expect(bundled).toMatchSnapshot();
    runInVmContext(bundled);
  });

  it("default (preact)", async () => {
    const filename = "app-export-default-preact.jsx";
    const filePath = resolvePath(filename);
    const res = await bundle(filePath);
    expect(res).toMatchSnapshot();

    const bundled = buildWebEntryModule(res);
    expect(bundled).toMatchSnapshot();
    runInVmContext(bundled);
  });
});
