import * as fs from "node:fs";
import * as path from "node:path";
import { vi, describe, it, expect } from "vitest";
import { transform } from ".";

const createPath = (filename: string) =>
  path.join(__dirname, "../../fixtures", filename);
const readFixture = (filename: string) => fs.readFileSync(filename, "utf-8");

vi.setConfig({ testTimeout: 30000 });

describe("transform", () => {
  it("export default", async () => {
    const filename = "app-export-default.jsx";
    const filePath = createPath(filename);
    const src = readFixture(filePath);
    expect(
      await transform({ filename: filePath, src, options: {} })
    ).toMatchSnapshot();
  });

  it("export default with backticks", async () => {
    const filename = "app-export-default-with-backticks.jsx";
    const filePath = createPath(filename);
    const src = readFixture(filePath);
    expect(
      await transform({ filename: filePath, src, options: {} })
    ).toMatchSnapshot();
  });

  it("export default with md", async () => {
    const filename = "app-export-default-with-md.jsx";
    const filePath = createPath(filename);
    const src = readFixture(filePath);
    expect(
      await transform({ filename: filePath, src, options: {} })
    ).toMatchSnapshot();
  });
});
