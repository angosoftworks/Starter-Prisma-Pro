import { test, expect } from '@playwright/test';
import { routes } from '../config';
import { GetOrgMock, GetSubscriptionMock, MockOrg, clearDB } from '../prisma';

import { WebhookEventHandler } from '@/lib/API/Services/payments/webhook';
import { MockWebhookPayload, MockPriceId1, MockSubscriptionEvent } from '../utils';

test.describe('Subscription Tests', () => {
  test.afterAll(async () => {
    await clearDB();
  });

  test('Create Subscription Webhook Flow', async ({ page }) => {
    await page.goto(routes.urls.UserDashboard);
    const org_create = await MockOrg();
    const org_id = org_create.id;

    MockWebhookPayload.data.object.metadata.org_id = org_id;

    //@ts-ignore, wrong type on stripe
    await WebhookEventHandler(MockWebhookPayload);

    const subscription_id = MockWebhookPayload.data.object.subscription;
    const customer_id = MockWebhookPayload.data.object.customer;
    const status = MockWebhookPayload.data.object.status;
    const price_id = MockPriceId1;

    const mockSub = { id: subscription_id, price_id, status };
    const mockOrg = {
      id: org_id,
      name: org_create.name,
      owner_user_id: org_create.owner_user_id,
      subscription_id,
      customer_id
    };

    const subscription = await GetSubscriptionMock(subscription_id);
    //asserting on date field leads to flakey behavior
    delete subscription.period_ends_at;

    const org = await GetOrgMock(org_id);

    expect(subscription).toEqual(mockSub);
    expect(org).toEqual(mockOrg);
  });

  test.skip('Update Subscription Webhook Flow', async () => {
    const subscription_id = MockSubscriptionEvent.data.object.id;

    const mockSubUpdate = {
      price_id: 'priceid_test3345'
    };

    MockSubscriptionEvent.data.object.items.data[0].price.id = mockSubUpdate.price_id;

    //@ts-ignore, wrong type exported from stripe
    await WebhookEventHandler(MockSubscriptionEvent);

    const subscription = await GetSubscriptionMock(subscription_id);
    expect(subscription.price_id).toEqual(mockSubUpdate.price_id);
  });
});
