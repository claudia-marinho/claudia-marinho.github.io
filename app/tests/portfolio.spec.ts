import { test, expect } from "@playwright/test";

for (const width of [1440, 900, 760, 390]) {
  test.describe(`page content at ${width}px`, () => {
    test.use({ viewport: { width, height: 900 }, reducedMotion: "reduce" });

    test("renders all sections and career history without horizontal overflow", async ({
      page,
    }) => {
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      await page.goto("/");

      await expect(page).toHaveTitle("Cláudia Marinho — Software Engineer");
      await expect(page.getByRole("heading", { level: 1 })).toContainText(
        "CLÁUDIA",
      );
      await expect(page.locator("main > section")).toHaveCount(5);
      await expect(page.locator(".capability h3")).toHaveText([
        "Frontend experiences",
        "APIs & BFFs",
        "Delivery",
        "Technical guidance",
      ]);
      await expect(page.locator(".company")).toHaveCount(2);
      await expect(page.locator(".role-heading h4")).toHaveText([
        "Software Engineer III",
        "Software Engineer II",
        "Software Engineer & Technical Project Manager",
        "Software Engineer & Junior Technical Project Manager",
        "Junior Software Engineer",
      ]);
      await expect(page.locator(".project h3")).toHaveText([
        "CinEd",
        "XReco",
        "TRUE",
      ]);

      // Check each section after scrolling so lazy-loaded content is exercised.
      for (const section of await page
        .locator("main > section, footer")
        .all()) {
        await section.scrollIntoViewIfNeeded();
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
        ).toBe(true);
      }
      expect(errors).toEqual([]);
    });
  });
}

test.describe("footer links and assets", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("contact links point to the correct destinations", async ({ page }) => {
    await expect(
      page.getByRole("link", { name: "Email", exact: true }),
    ).toHaveAttribute("href", "mailto:claudia.m.r.marinho@gmail.com");

    for (const [name, href] of [
      ["LinkedIn", "https://www.linkedin.com/in/claudia-marinho/"],
      ["GitHub", "https://github.com/claudia-marinho"],
    ]) {
      const link = page.getByRole("link", { name, exact: true });
      await expect(link).toHaveAttribute("href", href);
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  });

  test("CV download completes with the intended filename", async ({ page }) => {
    const downloadPromise = page.waitForEvent("download");
    await page.getByRole("link", { name: "Save as PDF" }).click();
    const download = await downloadPromise;

    expect(download.suggestedFilename()).toBe("CV_Claudia_Marinho.pdf");
    expect(await download.failure()).toBeNull();
  });

  test("page images load successfully and have descriptive alternative text", async ({
    page,
  }) => {
    for (const image of await page.locator("img").all()) {
      await image.scrollIntoViewIfNeeded();
      await expect(image).toHaveAttribute("alt", /\S+/);
      await expect
        .poll(() =>
          image.evaluate(
            (element) =>
              element instanceof HTMLImageElement &&
              element.complete &&
              element.naturalWidth > 0,
          ),
        )
        .toBe(true);
    }
  });
});
