import { test, expect } from '@playwright/test';

test.describe('Theme Switching', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should toggle theme from light to dark', async ({ page }) => {
    const themeBtn = page.getByTestId('btn-theme');
    await themeBtn.click();
    const body = page.locator('body');
    await expect(body).toHaveAttribute('data-theme', 'dark');
  });

  test('should cycle through all themes', async ({ page }) => {
    const themeBtn = page.getByTestId('btn-theme');
    const body = page.locator('body');

    // Start at light
    await expect(body).toHaveAttribute('data-theme', 'light');

    // Click to dark
    await themeBtn.click();
    await expect(body).toHaveAttribute('data-theme', 'dark');

    // Click to terminal
    await themeBtn.click();
    await expect(body).toHaveAttribute('data-theme', 'terminal');

    // Click back to light
    await themeBtn.click();
    await expect(body).toHaveAttribute('data-theme', 'light');
  });

  test('should persist theme across page reloads', async ({ page }) => {
    const themeBtn = page.getByTestId('btn-theme');
    await themeBtn.click();

    await page.reload();

    const body = page.locator('body');
    await expect(body).toHaveAttribute('data-theme', 'dark');
  });
});
