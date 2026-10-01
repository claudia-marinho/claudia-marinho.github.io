import { test, expect } from "@playwright/test";

test("navigation updates when content moves section boundaries", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.locator('nav a[href="#build"]').click();
  const buildLink = page.locator('nav a[href="#build"]');
  await expect(buildLink).toHaveAttribute("aria-current", "location");
  await page.evaluate(() => {
    // Disable scroll anchoring to isolate layout changes from scroll events.
    document.documentElement.style.overflowAnchor = "none";
    const about = document.getElementById("about")!;
    about.style.minHeight = `${about.getBoundingClientRect().height + 300}px`;
  });
  await expect(page.locator('nav a[href="#about"]')).toHaveAttribute(
    "aria-current",
    "location",
  );
  await expect(buildLink).not.toHaveAttribute("aria-current");
});

test("motion preference changes do not replay completed reveals", async ({
  page,
}) => {
  await page.goto("/");
  await page.locator("#about").scrollIntoViewIfNeeded();
  await expect(page.locator(".about-copy")).toHaveClass(/reveal-in/);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".reveal-in")).toHaveCount(0);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.locator("#projects").scrollIntoViewIfNeeded();
  await expect(page.locator(".project-text").first()).toHaveClass(/reveal-in/);
  await expect(page.locator(".about-copy")).not.toHaveClass(/reveal-in/);
});

test("content and navigation work without browser observers", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Reflect.deleteProperty(window, "IntersectionObserver");
    Reflect.deleteProperty(window, "ResizeObserver");
  });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.locator('nav a[href="#projects"]').click();
  await expect(page.locator('nav a[href="#projects"]')).toHaveAttribute(
    "aria-current",
    "location",
  );
  await expect(page.locator(".project-text").first()).toBeVisible();
  await expect(page.locator(".reveal-in")).toHaveCount(0);
});
