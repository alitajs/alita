import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:8986/');
});

test.describe('basic', () => {
  test('render', async ({ page }) => {
    await expect(
      page.getByText('Hello Alita, Click Me Close This Tab!'),
    ).toBeVisible();
  });
});
