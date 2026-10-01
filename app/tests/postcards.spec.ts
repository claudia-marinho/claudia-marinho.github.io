import { test, expect } from "@playwright/test";

const photos = [
  {
    label: "mountains",
    caption: "My favourite kind of path has very little pavement.",
    location: "Ruta del Cares · Asturias",
  },
  {
    label: "Japan",
    caption: "A table for one, two Pikachus for company.",
    location: "Pokémon Café · Tokyo",
  },
  {
    label: "metal",
    caption: "The person behind the polite emails. 🤘",
    location: "Vilar de Mouros",
  },
];

for (const width of [1440, 390]) {
  test.describe(`postcards at ${width}px`, () => {
    test.use({ viewport: { width, height: 900 }, hasTouch: width === 390 });
    test("photos open, remain accessible and close without losing the reader's place", async ({
      page,
    }, testInfo) => {
      await page.goto("/");
      const dialog = page.getByRole("dialog");
      await expect(dialog).not.toBeVisible();
      for (const [index, photo] of photos.entries()) {
        const trigger = page.getByRole("button", {
          name: `Discover a ${photo.label} photo`,
        });
        await trigger.scrollIntoViewIfNeeded();
        await page
          .locator(".about-copy")
          .evaluate((element) =>
            Promise.all(
              element.getAnimations().map((animation) => animation.finished),
            ),
          );
        if (width === 390) await trigger.tap();
        else {
          await trigger.focus();
          await trigger.press("Enter");
        }
        await expect(dialog).toBeVisible();
        await expect(dialog).toHaveAccessibleName(photo.caption);
        await expect(dialog).toHaveAccessibleDescription(photo.location);
        await expect
          .poll(() =>
            dialog
              .locator("img")
              .evaluate((img) => (img as HTMLImageElement).naturalWidth),
          )
          .toBeGreaterThan(0);
        await expect(page.locator("html")).toHaveCSS("overflow", "hidden");
        const close = dialog.getByRole("button", { name: "Close photo" });
        await expect(close).toBeFocused();
        if (width === 1440) {
          await page.keyboard.press("Tab");
          await page.keyboard.press("Tab");
          await expect(close).toBeFocused();
        }
        await expect
          .poll(() =>
            dialog.evaluate(
              (element) =>
                getComputedStyle(element, "::backdrop").backdropFilter,
            ),
          )
          .toBe("blur(4px)");
        await expect
          .poll(() =>
            dialog.evaluate((element) => {
              const bounds = element.getBoundingClientRect();
              return (
                bounds.left >= 0 &&
                bounds.right <= innerWidth &&
                bounds.top >= 0 &&
                bounds.bottom <= innerHeight
              );
            }),
          )
          .toBe(true);
        if (index === 1) {
          await dialog.evaluate((element) =>
            Promise.all(
              element.getAnimations().map((animation) => animation.finished),
            ),
          );
          await page.screenshot({
            path: testInfo.outputPath("postcard-japan.png"),
          });
        }
        const scrollBeforeClose = await page.evaluate(() => scrollY);
        if (index === 0) await close.click();
        else if (index === 1) await page.keyboard.press("Escape");
        else await page.mouse.click(5, 5);
        await expect(dialog).not.toBeVisible();
        await expect(trigger).toBeFocused();
        await expect(page.locator("html")).not.toHaveClass(/postcard-open/);
        await expect
          .poll(async () =>
            Math.abs((await page.evaluate(() => scrollY)) - scrollBeforeClose),
          )
          .toBeLessThan(5);
      }
    });
  });
}

test("postcards respect reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const trigger = page.getByRole("button", {
    name: "Discover a mountains photo",
  });
  await trigger.focus();
  await expect(trigger.locator("svg")).toHaveCSS("animation-name", "none");
  await trigger.press("Enter");
  await expect(page.getByRole("dialog")).toHaveCSS("animation-name", "none");
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
});

test("postcard icons wiggle and the photo animates in", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const trigger = page.getByRole("button", {
    name: "Discover a mountains photo",
  });
  await trigger.hover();
  await expect(trigger.locator("svg")).toHaveCSS(
    "animation-name",
    "postcard-wiggle",
  );
  await trigger.click();
  await expect(page.getByRole("dialog")).toHaveCSS(
    "animation-name",
    "postcard-arrive",
  );
});
