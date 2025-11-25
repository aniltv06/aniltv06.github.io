import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should navigate to skills section', async ({ page }) => {
    await page.getByTestId('nav-link-skills').click();
    await expect(page.locator('#skills')).toBeInViewport();
  });

  test('should navigate to experience section', async ({ page }) => {
    await page.getByTestId('nav-link-experience').click();
    await expect(page.locator('#experience')).toBeInViewport();
  });

  test('should toggle mobile menu', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    const hamburger = page.getByTestId('hamburger');
    await hamburger.click();
    const mobileNav = page.getByTestId('mobile-nav');
    await expect(mobileNav).toHaveAttribute('data-state', 'open');
  });

  test('should close mobile menu on navigation', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.getByTestId('hamburger').click();
    await page.getByTestId('mobile-nav-link-skills').click();
    const mobileNav = page.getByTestId('mobile-nav');
    await expect(mobileNav).toHaveAttribute('data-state', 'closed');
  });

  test('should show back-to-top button after scrolling', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, 500));
    const backToTop = page.getByTestId('back-to-top');
    await expect(backToTop).toHaveClass(/fab--visible/);
  });
});
