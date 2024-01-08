import { WebhookPayload, Subscription } from '@/lib/API/Services/lemon/lemonTypes';

const mockSubscription: Subscription = {
  type: 'subscriptions',
  id: 'ffd43565',
  attributes: {
    store_id: 123,
    order_id: 123456,
    customer_id: 123456,
    order_item_id: 123456,
    product_id: 123456,
    variant_id: 123456,
    product_name: 'test',
    variant_name: 'test',
    user_name: 'test',
    user_email: 'test124@yahoo.com',
    status: 'active',
    status_formatted: '1232434',
    pause: null,
    cancelled: false,
    trial_ends_at: null,
    billing_anchor: 123456,
    urls: {
      update_payment_method: '1232434'
    },
    renews_at: '1232434',
    ends_at: '123423434',
    created_at: '1232434',
    updated_at: '1232434',
    test_mode: true
  }
};

export const MockWebhookPayload: WebhookPayload = {
  meta: {
    event_name: 'subscription_created',
    custom_data: { org_id: '' }
  },
  data: mockSubscription
};
