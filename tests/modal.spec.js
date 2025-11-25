import { test, expect } from '@playwright/test';

test.describe('Modal Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should open project modal', async ({ page }) => {
    const projectCard = page.getByTestId('project-genius');
    await projectCard.click();

    const modal = page.getByTestId('modal');
    await expect(modal).toHaveAttribute('data-state', 'open');
    await expect(modal).toBeVisible();
  });

  test('should close modal with close button', async ({ page }) => {
    const projectCard = page.getByTestId('project-genius');
    await projectCard.click();

    const closeBtn = page.getByTestId('modal-close');
    await closeBtn.click();

    const modal = page.getByTestId('modal');
    await expect(modal).toHaveAttribute('data-state', 'closed');
  });

  test('should close modal with Escape key', async ({ page }) => {
    const projectCard = page.getByTestId('project-genius');
    await projectCard.click();

    await page.keyboard.press('Escape');

    const modal = page.getByTestId('modal');
    await expect(modal).toHaveAttribute('data-state', 'closed');
  });

  test('should trap focus within modal', async ({ page }) => {
    const projectCard = page.getByTestId('project-genius');
    await projectCard.click();

    const closeBtn = page.getByTestId('modal-close');
    await expect(closeBtn).toBeFocused();

    // Tab should stay within modal
    await page.keyboard.press('Tab');
    const focusedElement = await page.evaluate(() => document.activeElement.tagName);
    expect(['BUTTON', 'A']).toContain(focusedElement);
  });
});
