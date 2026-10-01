import { test, expect } from "@playwright/test";

for (const width of [1440, 390]) {
  test.describe(`playful entrances at ${width}px`, () => {
    test.use({ viewport: { width, height: 900 } });

    test("hero elements enter in sequence and rays animate with their section", async ({
      page,
    }) => {
      await page.emulateMedia({ reducedMotion: "no-preference" });
      await page.goto("/");

      for (const [selector, delay] of [
        [".hero-greeting", "0s"],
        [".hero-word", "0.1s"],
        [".hero-role-group", "0.22s"],
        [".hero-copy > p", "0.32s"],
        [".hero-copy > .button", "0.42s"],
      ]) {
        await expect(page.locator(selector)).toHaveCSS(
          "animation-name",
          "hero-pop",
        );
        await expect(page.locator(selector)).toHaveCSS(
          "animation-delay",
          delay,
        );
      }

      await expect(page.locator(".hero-rays")).toHaveCSS(
        "animation-name",
        "rays-pop",
      );
      await expect(page.locator(".hero-scribble path")).toHaveCSS(
        "animation-name",
        "draw-mark",
      );
      await page.locator("#about").scrollIntoViewIfNeeded();
      await expect(page.locator(".about-copy")).toHaveClass(/reveal-in/);
      await expect(page.locator(".about-rays")).toHaveCSS(
        "animation-name",
        "rays-pop",
      );

      // Wait for the CTA entrance to finish; its hover motion must still work.
      await page
        .locator(".hero-copy > .button")
        .evaluate((element) =>
          Promise.all(
            element.getAnimations().map((animation) => animation.finished),
          ),
        );
      const cta = page.getByRole("link", { name: "Explore my work" });
      await cta.hover();
      await expect(cta).toHaveCSS("transform", "matrix(1, 0, 0, 1, 0, -3)");
    });

    test("reduced motion keeps the hero, rays, and postcard still", async ({
      page,
    }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto("/");

      for (const selector of [
        ".hero-greeting",
        ".hero-word",
        ".hero-role-group",
        ".hero-copy > p",
        ".hero-copy > .button",
        ".hero-rays",
        ".hero-rays path",
        ".hero-scribble path",
      ]) {
        await expect(page.locator(selector)).toHaveCSS(
          "animation-name",
          "none",
        );
      }

      await page
        .getByRole("button", { name: "Discover a Japan photo" })
        .click();
      await expect(page.getByRole("dialog")).toHaveCSS(
        "animation-name",
        "none",
      );
    });
  });
}
