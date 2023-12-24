import { test, expect } from '@playwright/test';

test.use({ storageState: 'playwright/.auth/admin.json' });

test('has title', async ({ page }) => {
  await page.goto('http://localhost:3000/user/dashboard/');
});

test('get started link', async ({ page }) => {
  await page.goto('http://localhost:3000/user/dashboard/');
});
