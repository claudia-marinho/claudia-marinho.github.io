import { test, expect } from "@playwright/test";
import { expectInsideViewport } from "./helpers";

// Expected user-facing content is independent of the application's data file.
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
    // Animation appearance has separate tests; interaction tests remain deterministic.
    test.use({
      viewport: { width, height: 900 },
      hasTouch: width === 390,
      reducedMotion: "reduce",
    });
    test.beforeEach(async ({ page }) => {
      await page.goto("/");
    });

    for (const photo of photos) {
      test(`${photo.label} opens with the correct accessible caption and loaded photo`, async ({
        page,
      }) => {
        const trigger = page.getByRole("button", {
          name: `Discover a ${photo.label} photo`,
        });
        await expect(page.getByRole("dialog")).not.toBeVisible();

        if (width === 390) await trigger.tap();
        else {
          await trigger.focus();
          await trigger.press("Enter");
        }

        const dialog = page.getByRole("dialog");
        await expect(dialog).toBeVisible();
        await expect(dialog).toHaveAccessibleName(photo.caption);
        await expect(dialog).toHaveAccessibleDescription(photo.location);
        await expect(dialog.locator("img")).toHaveAttribute("alt", /\S+/);
        await expect
          .poll(() =>
            dialog
              .locator("img")
              .evaluate(
                (image) =>
                  image instanceof HTMLImageElement &&
                  image.complete &&
                  image.naturalWidth > 0,
              ),
          )
          .toBe(true);
        await expectInsideViewport(dialog);
        await expect(page.locator("html")).toHaveCSS("overflow", "hidden");
        await expect(
          dialog.getByRole("button", { name: "Close photo" }),
        ).toBeFocused();
      });
    }

    for (const dismissal of ["close button", "Escape", "backdrop"] as const) {
      test(`${dismissal} restores focus and the reader's scroll position`, async ({
        page,
      }) => {
        const trigger = page.getByRole("button", {
          name: "Discover a mountains photo",
        });
        await trigger.scrollIntoViewIfNeeded();
        await trigger.focus();
        const originalScroll = await page.evaluate(() => scrollY);
        await trigger.press("Enter");
        const dialog = page.getByRole("dialog");
        await expect(dialog).toBeVisible();
        await expect
          .poll(async () =>
            Math.abs((await page.evaluate(() => scrollY)) - originalScroll),
          )
          .toBeLessThan(5);

        if (dismissal === "close button")
          await dialog.getByRole("button", { name: "Close photo" }).click();
        else if (dismissal === "Escape") await page.keyboard.press("Escape");
        else await page.mouse.click(5, 5);

        await expect(dialog).not.toBeVisible();
        await expect(trigger).toBeFocused();
        await expect(page.locator("html")).not.toHaveClass(/postcard-open/);
        await expect
          .poll(async () =>
            Math.abs((await page.evaluate(() => scrollY)) - originalScroll),
          )
          .toBeLessThan(5);
      });
    }

    test("focus stays in the modal and clicking its content does not dismiss it", async ({
      page,
    }) => {
      const trigger = page.getByRole("button", {
        name: "Discover a Japan photo",
      });
      await trigger.click();
      const dialog = page.getByRole("dialog");
      const close = dialog.getByRole("button", { name: "Close photo" });

      await page.keyboard.press("Tab");
      await page.keyboard.press("Tab");
      await expect(close).toBeFocused();
      await page.keyboard.press("Shift+Tab");
      await page.keyboard.press("Shift+Tab");
      await expect(close).toBeFocused();

      await dialog.locator("figcaption").click();
      await expect(dialog).toBeVisible();
      await close.click();
      await trigger.click();
      await expect(dialog).toHaveAccessibleName(
        "A table for one, two Pikachus for company.",
      );
    });
  });
}

test("reduced motion disables both trigger and modal animations", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const trigger = page.getByRole("button", {
    name: "Discover a mountains photo",
  });
  await trigger.focus();
  await expect(trigger.locator("svg")).toHaveCSS("animation-name", "none");
  await trigger.press("Enter");
  await expect(page.getByRole("dialog")).toHaveCSS("animation-name", "none");
});

test("normal motion animates the trigger and modal, with a blurred backdrop", async ({
  page,
}) => {
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
  const dialog = page.getByRole("dialog");
  await expect(dialog).toHaveCSS("animation-name", "postcard-arrive");
  await expect
    .poll(() =>
      dialog.evaluate(
        (element) => getComputedStyle(element, "::backdrop").backdropFilter,
      ),
    )
    .toBe("blur(4px)");
});

for (const reducedMotion of ["reduce", "no-preference"] as const) {
  test(`loading placeholder gives way to the photo with ${reducedMotion} motion`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion });

    // Hold the response until the placeholder has been checked; no fixed sleeps.
    let releasePhoto!: () => void;
    const photoReleased = new Promise<void>((resolve) => {
      releasePhoto = resolve;
    });
    await page.route("**/postcard-japan.jpg", async (route) => {
      await photoReleased;
      await route.continue();
    });

    await page.goto("/");
    await page.getByRole("button", { name: "Discover a Japan photo" }).click();
    const dialog = page.getByRole("dialog");
    const image = dialog.locator("img");

    try {
      await expect(dialog.getByRole("status")).toHaveText("Loading photo…");
      await expect(image).toHaveCSS("opacity", "0");
      await expect(image).toHaveCSS(
        "transition-duration",
        reducedMotion === "reduce" ? "0s" : "0.3s",
      );
    } finally {
      releasePhoto();
    }

    await expect(dialog.getByRole("status")).toHaveCount(0);
    await expect(image).toHaveCSS("opacity", "1");
    await expectInsideViewport(dialog);
  });
}

test("a failed photo shows feedback and the postcard can still be closed", async ({
  page,
}) => {
  await page.route("**/postcard-metal.jpg", (route) => route.abort());
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Discover a metal photo" });
  await trigger.click();
  const dialog = page.getByRole("dialog");

  await expect(dialog.getByRole("status")).toHaveText("Photo couldn’t load.");
  await dialog.getByRole("button", { name: "Close photo" }).click();
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
});
