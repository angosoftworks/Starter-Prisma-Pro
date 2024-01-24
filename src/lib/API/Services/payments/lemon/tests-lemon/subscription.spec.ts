//import { test, expect } from '@playwright/test';

//import { GetOrgMock, GetSubscriptionMock, MockOrg, clearDB } from '../prisma';

//import { WebhookEventHandler } from '@/lib/API/Services/payments/webhook';
//import { MockWebhookPayload } from './mockSubscription';

//test.describe('Subscription Tests', () => {
//  test.afterAll(async () => {
//    await clearDB();
//  });

//  test('Create Subscription Webhook Flow', async () => {
//    const org_create = await MockOrg();
//    const org_id = org_create.id;
//    MockWebhookPayload.meta.custom_data.org_id = org_id;

//    await WebhookEventHandler(MockWebhookPayload);

//    const subscription_id = MockWebhookPayload.data.id;
//    const customer_id = MockWebhookPayload.data.attributes.customer_id;
//    const status = MockWebhookPayload.data.attributes.status;
//    const price_id = MockWebhookPayload.data.attributes.variant_id.toString();

//    const mockSub = { id: subscription_id, price_id, status };
//    const mockOrg = {
//      id: org_id,
//      name: org_create.name,
//      owner_user_id: org_create.owner_user_id,
//      subscription_id,
//      customer_id
//    };

//    const subscription = await GetSubscriptionMock(subscription_id);
//    //asserting on date field leads to flakey behavior
//    delete subscription.period_ends_at;

//    const org = await GetOrgMock(org_id);

//    expect(subscription).toEqual(mockSub);
//    expect(org).toEqual(mockOrg);
//  });

//  test('Update Subscription Webhook Flow', async () => {
//    const subscription_id = MockWebhookPayload.data.id;

//    MockWebhookPayload.meta.event_name = 'subscription_updated';

//    const mockSubUpdate = {
//      price_id: 858585
//    };

//    MockWebhookPayload.data.attributes.variant_id = mockSubUpdate.price_id;

//    await WebhookEventHandler(MockWebhookPayload);

//    const subscription = await GetSubscriptionMock(subscription_id);
//    expect(subscription.price_id).toEqual(mockSubUpdate.price_id.toString());
//  });
//});
