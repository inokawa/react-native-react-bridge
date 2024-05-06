import { test, expect } from "@playwright/test";
import { readdirSync } from "node:fs";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { bundle } from "../src/plugin/bundler";
import { WEB_ROOT_ID } from "../src/constants";

test.beforeEach(async ({}, testInfo) => {
  // https://github.com/microsoft/playwright/issues/7575#issuecomment-1168800666
  testInfo.snapshotSuffix = "";
});

test.describe("smoke webview", () => {
  const fixturePath = path.join(process.cwd(), "fixtures");
  const tempPath = path.join(process.cwd(), "e2e/temp");

  readdirSync(fixturePath).forEach((filename) => {
    if (filename.endsWith(".jsx") || filename.endsWith(".tsx")) {
      test(filename, async ({ page }) => {
        const isPreact = filename.includes("preact");
        const isWeb = filename.includes("web");
        const html = await bundle(path.join(fixturePath, filename), {
          preact: isPreact,
          web: isWeb,
        });
        expect(html).toMatchSnapshot();

        await writeFile(path.join(tempPath, filename) + ".html", html, "utf-8");

        await page.goto(`localhost:3000/temp/${filename}.html`);

        const rootHandle = await page.waitForFunction(
          (id) => document.getElementById(id)!,
          WEB_ROOT_ID
        );

        expect(await rootHandle.evaluate((e) => e.innerHTML)).toMatchSnapshot();
        expect(
          await page.evaluate(() => document.head.innerHTML)
        ).toMatchSnapshot();
      });
    }
  });
});
