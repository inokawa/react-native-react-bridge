import { test, expect } from "@playwright/experimental-ct-react";

test.use({ viewport: { width: 500, height: 1000 } });

test("should work", async ({ mount }) => {
  const component = await mount(<div>Learn React</div>);
  await expect(component).toContainText("Learn React");
});
