import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:9999/');
});

test.describe('basic', () => {
  test('render', async ({ page }) => {
    await expect(page.getByText('Hello Mako')).toBeVisible();
  });
});
