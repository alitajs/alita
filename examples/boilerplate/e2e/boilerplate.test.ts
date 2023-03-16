import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:8888/');
});

test.describe('basic', () => {
  test('render', async ({ page }) => {
    await expect(page.getByText('antd mobile')).toBeVisible();
  });
});
