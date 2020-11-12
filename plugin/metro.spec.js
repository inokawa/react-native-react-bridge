import * as fs from "fs";
import * as path from "path";
import { bundle } from "./metro";

const resolvePath = (filename) => path.join(__dirname, "../fixtures", filename);

describe("bundle", () => {
  beforeEach(() => {
    jest.setTimeout(30000);
  });

  it("Component.jsx", async () => {
    const filename = "Component.jsx";
    const filePath = resolvePath(filename);
    const res = await bundle([filePath]);
    Object.entries(res).forEach(([k, v]) => {
      expect(v).toMatchSnapshot();
    });
  });
});
