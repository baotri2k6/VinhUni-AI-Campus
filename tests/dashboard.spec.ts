import { expect, test } from "@playwright/test";

test("preferences survive reload and Copilot handles demo prompts", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Switch to English" }).click();
  await page.getByRole("button", { name: "Toggle theme" }).click();
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");

  const opener = page.getByRole("button", { name: "Ask Copilot" });
  await opener.click();
  const dialog = page.getByRole("dialog", { name: "VinhUni Copilot" });
  await dialog.getByRole("button", { name: "Check credit progress" }).click();
  await expect(dialog.getByRole("log")).toContainText("66 credits remaining");
  await dialog.getByRole("textbox", { name: "Message" }).fill("Free text");
  await dialog.getByRole("button", { name: "Send" }).click();
  await expect(dialog.getByRole("log")).toContainText("This demo supports sample questions");
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(opener).toBeFocused();
});

for (const width of [320, 390, 768, 1024, 1440]) {
  test(`dashboard fits a ${width}px viewport`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Chào An!" })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
  });
}
