import * as path from "node:path";
import { vi, describe, it, expect } from "vitest";
import { bundle } from "./bundler";
import { readdirSync } from "node:fs";
import { wrapWithWebViewHTML } from "./html";

vi.setConfig({ testTimeout: 30000 });

describe("bundle", () => {
  const fixturePath = path.join(process.cwd(), "fixtures");
  readdirSync(fixturePath).forEach((filename) => {
    if (filename.endsWith(".jsx") || filename.endsWith(".tsx")) {
      it(filename, async () => {
        const res = await bundle(
          path.join(fixturePath, filename),
          wrapWithWebViewHTML
        );
        expect(res).toMatchSnapshot();

        expect(eval(res)).toMatchSnapshot();
      });
    }
  });
});
