import { test, expect } from "@playwright/test";
for (const width of [1440, 900, 760, 390]) {
  test(`portfolio behaviour at ${width}px`, async ({ page, request }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "CLÁUDIA",
    );
    await expect(page.locator("main > section")).toHaveCount(5);
    await expect(page.locator(".project")).toHaveCount(3);
    for (const id of ["about", "build", "experience", "projects"]) {
      await page.locator(`nav a[href="#${id}"]`).click();
      await expect(page.locator(`nav a[href="#${id}"]`)).toHaveAttribute(
        "aria-current",
        "location",
      );
      await expect
        .poll(() =>
          page
            .locator("#" + id)
            .evaluate((el) =>
              Math.abs(
                el.getBoundingClientRect().top -
                  document.querySelector("header")!.getBoundingClientRect()
                    .height,
              ),
            ),
        )
        .toBeLessThan(5);
    }
    await expect(page.locator(".project-text").first()).toHaveClass(
      /reveal-in/,
    );
    await page.locator("footer").scrollIntoViewIfNeeded();
    const downloadPromise = page.waitForEvent("download");
    await page.getByRole("link", { name: "Save as PDF" }).click();
    expect((await downloadPromise).suggestedFilename()).toBe(
      "CV_Claudia_Marinho.pdf",
    );
    for (const src of await page
      .locator("img")
      .evaluateAll((images) => images.map((img) => img.getAttribute("src")))) {
      expect((await request.get("/" + src)).ok()).toBeTruthy();
    }
    await expect(
      page.getByRole("link", { name: "Email", exact: true }),
    ).toHaveAttribute("href", /^mailto:/);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBeTruthy();
    await page.locator(".brand").click();
    await expect.poll(() => page.evaluate(() => scrollY)).toBeLessThan(5);
    expect(errors).toEqual([]);
  });
}
test("reduced motion keeps all content visible without reveal animations", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.locator("#projects").scrollIntoViewIfNeeded();
  await expect(page.locator(".reveal-in")).toHaveCount(0);
  await expect(page.locator(".project-text").first()).toBeVisible();
});
