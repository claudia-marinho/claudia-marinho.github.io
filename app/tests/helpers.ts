import { expect, type Locator, type Page } from "@playwright/test";

export async function expectSectionAtHeader(page: Page, id: string) {
  await expect(page.locator(`nav a[href="#${id}"]`)).toHaveAttribute(
    "aria-current",
    "location",
  );

  await expect
    .poll(() =>
      page.locator(`#${id}`).evaluate((section) => {
        const header = document.querySelector("header")!;
        return Math.abs(
          section.getBoundingClientRect().top -
            header.getBoundingClientRect().height,
        );
      }),
    )
    .toBeLessThan(5);
}

export async function expectInsideViewport(locator: Locator) {
  await expect
    .poll(() =>
      locator.evaluate((element) => {
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
}
