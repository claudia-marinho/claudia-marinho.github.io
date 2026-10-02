import { test, expect } from "@playwright/test";

for (const locale of ["pt", "pt-PT", "pt-BR", "en", "en-US", "fr-FR"]) {
  test.describe(`initial browser language ${locale}`, () => {
    test.use({ locale });

    test("detects a supported language or falls back to English", async ({
      page,
    }) => {
      await page.goto("/");
      await expect(page.locator("html")).toHaveAttribute(
        "lang",
        locale.startsWith("pt") ? "pt-PT" : "en",
      );
    });

    test("a saved choice takes priority over the browser", async ({ page }) => {
      const saved = locale.startsWith("pt") ? "en" : "pt";
      await page.addInitScript((language) => {
        localStorage.setItem("portfolio-language", language);
      }, saved);
      await page.goto("/");
      await expect(page.locator("html")).toHaveAttribute(
        "lang",
        saved === "pt" ? "pt-PT" : "en",
      );
    });
  });
}

test("switches the whole portfolio and remembers the chosen language", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Português", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-PT");
  await expect(
    page.getByRole("button", { name: "Português", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("h1")).toContainText("OLÁ, SOU A");
  await expect(page.locator("nav")).toContainText("Sobre mim");
  await expect(page.locator("#about")).toContainText(
    "a planear uma viagem ao Japão",
  );
  await expect(page.locator("#build")).toContainText("Orientação técnica");
  await expect(page.locator("#experience")).toContainText(
    "Novembro de 2024–presente",
  );
  await expect(page.locator("#projects")).toContainText(
    "Cinema europeu nas salas de aula",
  );
  await expect(page.locator("footer")).toContainText("Guardar PDF");
  await page.reload();
  await expect(page.locator("h1")).toContainText("OLÁ, SOU A");
  await page
    .getByRole("button", { name: "Ver uma fotografia no Japão" })
    .click();
  await expect(page.getByRole("dialog")).toContainText("dois Pikachus");
  await page.getByRole("button", { name: "Fechar fotografia" }).click();
  await page.getByRole("button", { name: "English", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("h1")).toContainText("HI, I’M");
});

test("language selector fits on a small screen", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  await page.getByRole("button", { name: "Português", exact: true }).click();
  const selector = page.locator(".language-selector");
  await expect(selector).toBeVisible();
  await page.emulateMedia({ reducedMotion: "reduce" });
  expect(
    await selector.evaluate((element) => {
      const bounds = element.getBoundingClientRect();
      return (
        bounds.right <= innerWidth &&
        bounds.bottom <= innerHeight &&
        document.documentElement.scrollWidth <= innerWidth
      );
    }),
  ).toBe(true);
});
