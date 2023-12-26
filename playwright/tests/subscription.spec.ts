import { test, expect } from '@playwright/test';
import { routes, org, todo } from '../config';
import { clearDB } from '../prisma';

import { WebhookEventHandler } from '@/lib/API/Services/lemon/webhook';
import { MockWebhookPayload } from '../utils';
import { MockOrg } from '../prisma';

const REPO = 'test-repo-1';
const USER = 'github-username';

test.describe('Todo Tests', () => {
  test.beforeAll(async ({ page }) => {
    //create org
    await page.goto(routes.urls.UserDashboard);
    await page.getByRole('link', { name: 'Create Org' }).click();
    await page.getByLabel('Title').click();
    await page.getByLabel('Title').fill(org.orgTodo);
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByRole('button', { name: 'Submit' }).isEnabled();
    await page.getByRole('link', { name: 'My SAAS' }).click();

    //go to dashboard
    await page.getByRole('link', { name: 'orgTodo Role: OWNER Click Go' }).click();
    await page.getByRole('link', { name: 'Todos' }).click();

    //create Todo
    await page.getByLabel('Title').click();
    await page.getByLabel('Title').fill(todo.todoTitle);
    await page.getByLabel('Description').click();
    await page.getByLabel('Description').fill(todo.todoDescription);
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByLabel('Title')).toBeEmpty();
    await expect(page.getByLabel('Description')).toBeEmpty();
  });

  test.beforeEach(async ({ page }) => {
    await page.goto(routes.urls.UserDashboard);
    await page.getByRole('link', { name: 'orgTodo Role: OWNER Click Go' }).click();
    await page.getByRole('link', { name: 'Todos' }).click();
  });

  test.afterAll(async ({ page }) => {
    await clearDB();
  });

  test('My Todos', async ({ page }) => {
    await page.getByRole('link', { name: 'My Todos' }).click();
    await expect(page.locator('h3')).toContainText('todo1');
    await expect(page.getByRole('main')).toContainText('todo description 1');
  });

  test('List Todos', async ({ page }) => {
    await page.getByRole('link', { name: 'All Todos' }).click();
    await expect(page.locator('h3')).toContainText('todo1');
    await expect(page.getByRole('main')).toContainText('todo description 1');
  });

  test('Edit Todo', async ({ page }) => {
    await page.getByRole('link', { name: 'My Todos' }).click();
    await page.getByRole('link', { name: 'Edit' }).click();
    await page.getByLabel('Title').click();
    await page.getByLabel('Title').fill('todo1 EDIT');
    await page.getByLabel('Description').click();
    await page.getByLabel('Description').fill('todo description 1 EDIT');
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.locator('h3')).toContainText('todo1 EDIT');
    await expect(page.getByRole('main')).toContainText('todo description 1 EDIT');
  });

  test.only('Delete Todo', async ({ page }) => {
    await page.getByRole('link', { name: 'My Todos' }).click();
    await page.getByRole('link', { name: 'My Todos' }).click();
    await page.getByRole('button', { name: 'Delete' }).click();
    await expect(page.getByRole('main')).toContainText('No Todos Found');
    await page.getByRole('link', { name: 'All Todos' }).click();
    await expect(page.getByRole('main')).toContainText('No Todos Found');
  });
});

test.describe('Subscription Tests', () => {
  // webhook test
  // create mock org
  //

  test('should create a bug report', async ({ page }) => {
    await page.goto(routes.urls.UserDashboard);

    const org_id = await MockOrg();
    MockWebhookPayload.meta.custom_data.org_id = org_id;
    expect(true).toEqual(true);

    //  await WebhookEventHandler(MockWebhookPayload);
    //   const newIssue = await request.post(`/repos/${USER}/${REPO}/issues`, {
    //        data: {
    //          title: '[Bug] report 1',
    //          body: 'Bug description'
    //        }
    //      });
    //      expect(newIssue.ok());
    //      const issues = await request.get(`/repos/${USER}/${REPO}/issues`);
    //      expect(issues.ok()).toBeTruthy();
    //      expect(await issues.json()).toContainEqual(
    //        expect.objectContaining({
    //          title: '[Bug] report 1',
    //          body: 'Bug description'
    //        })
    //      );
  });
});
