import { test, expect } from "@playwright/test";
import { expectSectionAtHeader } from "./helpers";

for (const width of [1440, 900, 760, 390]) {
  test.describe(`navigation at ${width}px`, () => {
    test.use({ viewport: { width, height: 900 }, reducedMotion: "reduce" });

    test("section links align below the header and the brand returns to the top", async ({
      page,
    }) => {
      await page.goto("/");

      for (const id of ["about", "build", "experience", "projects"]) {
        await test.step(`Navigate to ${id}`, async () => {
          await page.locator(`nav a[href="#${id}"]`).click();
          await expectSectionAtHeader(page, id);
          await expect(
            page.locator('nav a[aria-current="location"]'),
          ).toHaveCount(1);
        });
      }

      await page
        .getByRole("link", { name: "CLÁUDIA MARINHO", exact: true })
        .click();
      await expect.poll(() => page.evaluate(() => scrollY)).toBeLessThan(5);
      await expect(page.locator("nav a[aria-current]")).toHaveCount(0);
    });
  });
}

test.describe("anchor navigation", () => {
  test.use({ reducedMotion: "reduce" });

  test("opens a section directly from its URL hash", async ({ page }) => {
    await page.goto("/#projects");
    await expectSectionAtHeader(page, "projects");
  });

  test("Back and Forward restore the selected section", async ({ page }) => {
    await page.goto("/");
    await page.locator('nav a[href="#about"]').click();
    await expectSectionAtHeader(page, "about");
    await page.locator('nav a[href="#build"]').click();
    await expectSectionAtHeader(page, "build");

    await page.goBack();
    await expectSectionAtHeader(page, "about");
    await page.goForward();
    await expectSectionAtHeader(page, "build");
  });

  test("hero call to action works from the keyboard", async ({ page }) => {
    await page.goto("/");
    const link = page.getByRole("link", { name: "Explore my work" });
    await link.focus();
    await link.press("Enter");
    await expectSectionAtHeader(page, "projects");
  });
});
