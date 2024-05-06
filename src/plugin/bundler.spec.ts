import * as path from "node:path";
import * as vm from "node:vm";
import { vi, describe, it, expect } from "vitest";
import { bundle } from "./bundler";
import { readdirSync } from "node:fs";

vi.setConfig({ testTimeout: 30000 });

const runInVmContext = (code: string): string => {
  let evaluatedStr: string;
  const context = vm.createContext({
    render: (str: string) => {
      evaluatedStr = str;
    },
  });

  vm.runInContext(`render(${code});`, context);
  return evaluatedStr!;
};

describe("bundle", () => {
  const fixturePath = path.join(process.cwd(), "fixtures");
  readdirSync(fixturePath).forEach((filename) => {
    if (filename.endsWith(".jsx") || filename.endsWith(".tsx")) {
      it(filename, async () => {
        const res = await bundle(path.join(fixturePath, filename));
        expect(res).toMatchSnapshot();

        expect(runInVmContext(res)).toMatchSnapshot();
      });
    }
  });
});
