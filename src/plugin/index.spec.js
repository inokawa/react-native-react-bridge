import * as fs from "fs";
import * as path from "path";
import { transform } from "./";

const createPath = (filename) =>
  path.join(__dirname, "../../fixtures", filename);
const readFixture = (filename) => fs.readFileSync(filename, "utf-8");

describe("transform", () => {
  beforeEach(() => {
    jest.setTimeout(30000);
  });

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
