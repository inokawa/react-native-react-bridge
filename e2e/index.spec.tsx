import { test, expect } from "@playwright/test";
import { readdirSync } from "node:fs";
import path from "node:path";
import { bundle } from "../src/plugin/bundler";
import { WEB_ROOT_ID } from "../src/constants";
import { injectCode } from "../src/plugin/html";

test.beforeEach(async ({}, testInfo) => {
  // https://github.com/microsoft/playwright/issues/7575#issuecomment-1168800666
  testInfo.snapshotSuffix = "";
});

test.describe("smoke webview code", () => {
  const fixturePath = path.join(process.cwd(), "fixtures");
  readdirSync(fixturePath).forEach((filename) => {
    if (filename.endsWith(".jsx") || filename.endsWith(".tsx")) {
      test(filename, async ({ page }) => {
        await page.goto("localhost:3000");

        const code = await bundle(path.join(fixturePath, filename));

        const rootHandle = await page.waitForFunction(
          (id) => document.getElementById(id)!,
          WEB_ROOT_ID
        );

        await page.evaluate(
          (code) => {
            const rawCode = eval(code);
            eval(rawCode);
          },
          injectCode(code, (s) => s)
        );

        await page.waitForFunction((e) => e.innerHTML, rootHandle);
        await expect(
          await rootHandle.evaluate((e) => e.innerHTML)
        ).toMatchSnapshot();
        await expect(
          await page.evaluate(() => document.head.innerHTML)
        ).toMatchSnapshot();
      });
    }
  });
});
