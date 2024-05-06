import * as path from "node:path";
import * as vm from "node:vm";
import { vi, describe, it, expect } from "vitest";
import { bundle } from "./bundler";
import { buildWebEntryModule } from "./html";
import { readdirSync } from "node:fs";

vi.setConfig({ testTimeout: 30000 });

const runInVmContext = (code: string): string => {
  let evaluatedStr: string;
  const context = vm.createContext({
    render: (str: string) => {
      evaluatedStr = str;
    },
  });

  vm.runInContext(
    // vm does not support esm yet
    `render(${code.replace(/^export default /, "")});`,
    context
  );
  return evaluatedStr!;
};

describe("bundle", () => {
  const fixturePath = path.join(process.cwd(), "fixtures");
  readdirSync(fixturePath).forEach((filename) => {
    if (filename.endsWith(".jsx") || filename.endsWith(".tsx")) {
      it(filename, async () => {
        const res = await bundle(path.join(fixturePath, filename));
        expect(res).toMatchSnapshot();

        const bundled = buildWebEntryModule(res);
        expect(bundled).toMatchSnapshot();
        expect(runInVmContext(bundled)).toMatchSnapshot();
      });
    }
  });
});
