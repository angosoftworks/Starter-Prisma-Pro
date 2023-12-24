import { test as setup, expect } from '@playwright/test';

const adminFile = 'playwright/.auth/admin.json';

setup('authenticate as admin', async ({ page, request }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.waitForURL('**/auth/login');
  await page.getByPlaceholder('Email').fill('test1@yahoo.com');
  await page.getByRole('button', { name: 'Login with Email' }).click();

  await page.waitForURL('**/auth/confirmed');
  await expect(page.getByRole('heading')).toContainText('Request Successfully Submitted');

  const emails = await request.get(`http://localhost:1080/email`);
  const res = JSON.parse(await emails.text());
  const lastEmail = res.slice(-1)[0];
  const redirectUrl = lastEmail.text;

  await page.goto(redirectUrl);
  await page.waitForURL('**/user/dashboard');

  // End of authentication steps.
  await page.context().storageState({ path: adminFile });
});

const userFile = 'playwright/.auth/user.json';

setup('authenticate as user', async ({ page, request }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.waitForURL('**/auth/login');
  await page.getByPlaceholder('Email').fill('test1@yahoo.com');
  await page.getByRole('button', { name: 'Login with Email' }).click();

  await page.waitForURL('**/auth/confirmed');
  await expect(page.getByRole('heading')).toContainText('Request Successfully Submitted');

  const emails = await request.get(`http://localhost:1080/email`);
  const res = JSON.parse(await emails.text());
  const lastEmail = res.slice(-1)[0];
  const redirectUrl = lastEmail.text;

  await page.goto(redirectUrl);
  await page.waitForURL('**/user/dashboard');

  await page.context().storageState({ path: userFile });
});
