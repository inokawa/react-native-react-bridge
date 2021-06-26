import * as fs from "fs";
import * as path from "path";
import { createContent } from "./html";

const readFixture = (filename) =>
  fs.readFileSync(path.join(__dirname, "../../fixtures", filename), "utf-8");

describe("createContent", () => {
  it("export default webViewRender(App)", () => {
    const filename = "app-export-default.jsx";
    const src = readFixture(filename);
    expect(createContent(src)).toMatchSnapshot();
  });

  it("export default webViewRender(App) with backticks", () => {
    const filename = "app-export-default-with-backticks.jsx";
    const src = readFixture(filename);
    expect(createContent(src)).toMatchSnapshot();
  });
});
