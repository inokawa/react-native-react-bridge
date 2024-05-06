import { readFile } from "node:fs/promises";
import * as path from "node:path";
import { vi, describe, it, expect } from "vitest";
import { transform } from ".";

const createPath = (filename: string) =>
  path.join(process.cwd(), "fixtures", filename);

vi.setConfig({ testTimeout: 30000 });

describe("transform", () => {
  it("export default", async () => {
    const filename = "app-export-default.jsx";
    const filePath = createPath(filename);
    const src = await readFile(filePath, "utf-8");
    expect(
      await transform({ filename: filePath, src, options: {} })
    ).toMatchSnapshot();
  });

  it("export default with backticks", async () => {
    const filename = "issue45.jsx";
    const filePath = createPath(filename);
    const src = await readFile(filePath, "utf-8");
    expect(
      await transform({ filename: filePath, src, options: {} })
    ).toMatchSnapshot();
  });

  it("export default with md", async () => {
    const filename = "app-export-default-with-md.jsx";
    const filePath = createPath(filename);
    const src = await readFile(filePath, "utf-8");
    expect(
      await transform({ filename: filePath, src, options: {} })
    ).toMatchSnapshot();
  });
});
