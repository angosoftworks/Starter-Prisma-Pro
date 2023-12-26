import { test, expect } from '@playwright/test';
import { routes, org, todo } from '../config';
import { clearDB } from '../prisma';

test.use({ storageState: 'playwright/.auth/admin.json' });

test.describe('Org Tests', () => {
  test.beforeAll(async ({ page }) => {
    //create org
    await page.goto(routes.urls.UserDashboard);
    await page.getByRole('link', { name: 'Create Org' }).click();
    await page.getByLabel('Title').click();
    await page.getByLabel('Title').fill(org.orgTodo);
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByLabel('Title')).toBeEmpty();
    await page.getByRole('link', { name: 'My SAAS' }).click();
  });

  test.beforeEach(async ({ page }) => {
    await page.goto(routes.urls.UserDashboard);
    await page.getByRole('link', { name: 'orgTodo Role: OWNER Click Go' }).click();
    await expect(page.getByRole('navigation')).toContainText('Overview');
    await page.getByRole('link', { name: 'Settings' }).click();
  });

  test.afterAll(async () => {
    await clearDB();
  });

  test('Add Subscription', async ({ page }) => {
    await page.getByRole('link', { name: 'Subscription' }).click();
    await expect(page.getByRole('main')).toContainText('Add Subscription');
    await expect(page.getByRole('button', { name: 'Get Started' }).first()).toBeVisible();
  });

  test('Update Org Name', async ({ page }) => {
    await page.getByLabel('Display Name').click();
    await page.getByLabel('Display Name').fill('orgTodo-edit');
    await page.getByRole('button', { name: 'Update Profile' }).click();
    await expect(page.getByLabel('Display Name')).toHaveValue('orgTodo-edit');
  });
});
