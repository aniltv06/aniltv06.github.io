import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility', () => {
  test('should not have accessibility violations', async ({ page }) => {
    await page.goto('/');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('/');

    // Tab to skip link
    await page.keyboard.press('Tab');
    const skipLink = page.getByTestId('skip-link');
    await expect(skipLink).toBeFocused();

    // Tab through navigation
    await page.keyboard.press('Tab');
    const firstNavLink = page.getByTestId('nav-home');
    await expect(firstNavLink).toBeFocused();
  });

  test('should have proper ARIA labels', async ({ page }) => {
    await page.goto('/');

    // Check navigation
    const nav = page.getByRole('navigation', { name: 'Main navigation' });
    await expect(nav).toBeVisible();

    // Check buttons
    const downloadBtn = page.getByTestId('btn-download');
    await expect(downloadBtn).toHaveAttribute('aria-label');

    const themeBtn = page.getByTestId('btn-theme');
    await expect(themeBtn).toHaveAttribute('aria-label');
  });

  test('should announce theme changes to screen readers', async ({ page }) => {
    await page.goto('/');

    const themeBtn = page.getByTestId('btn-theme');
    await themeBtn.click();

    // Check for announcement (in real implementation)
    const announcer = page.locator('[role="status"]');
    await expect(announcer).toBeInViewport();
  });
});
