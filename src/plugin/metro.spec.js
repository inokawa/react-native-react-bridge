import * as fs from "fs";
import * as path from "path";
import { bundle } from "./metro";

const resolvePath = (filename) =>
  path.join(__dirname, "../../fixtures", filename);

jest.setTimeout(30000);

describe("bundle", () => {
  it("default", async () => {
    const filename = "app-export-default.jsx";
    const filePath = resolvePath(filename);
    const res = await bundle(filePath);
    expect(res).toMatchSnapshot();
  });

  it("default (tsx)", async () => {
    const filename = "app-export-default.tsx";
    const filePath = resolvePath(filename);
    const res = await bundle(filePath);
    expect(res).toMatchSnapshot();
  });

  it("with json", async () => {
    const filename = "app-export-default-with-json.jsx";
    const filePath = resolvePath(filename);
    const res = await bundle(filePath);
    expect(res).toMatchSnapshot();
  });

  it("with txt", async () => {
    const filename = "app-export-default-with-txt.jsx";
    const filePath = resolvePath(filename);
    const res = await bundle(filePath);
    expect(res).toMatchSnapshot();
  });

  it("with md", async () => {
    const filename = "app-export-default-with-md.jsx";
    const filePath = resolvePath(filename);
    const res = await bundle(filePath);
    expect(res).toMatchSnapshot();
  });

  it("with images", async () => {
    const filename = "app-export-default-with-images.jsx";
    const filePath = resolvePath(filename);
    const res = await bundle(filePath);
    expect(res).toMatchSnapshot();
  });

  it("with html", async () => {
    const filename = "app-export-default-with-html.jsx";
    const filePath = resolvePath(filename);
    const res = await bundle(filePath);
    expect(res).toMatchSnapshot();
  });

  it("with wasm", async () => {
    const filename = "app-export-default-with-wasm.jsx";
    const filePath = resolvePath(filename);
    const res = await bundle(filePath);
    expect(res).toMatchSnapshot();
  });

  it("with backticks", async () => {
    const filename = "app-export-default-with-backticks.jsx";
    const filePath = resolvePath(filename);
    const res = await bundle(filePath);
    expect(res).toMatchSnapshot();
  });

  it("default (preact)", async () => {
    const filename = "app-export-default-preact.jsx";
    const filePath = resolvePath(filename);
    const res = await bundle(filePath);
    expect(res).toMatchSnapshot();
  });
});
