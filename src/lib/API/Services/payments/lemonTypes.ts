export enum WebhookEventsE {
  SUBSCRIPTION_CREATED = 'subscription_created',
  SUBSCRIPTION_UPDATED = 'subscription_updated'
}

type SubscriptionEventNames = 'subscription_created' | 'subscription_updated';

type SubscriptionInvoiceEventNames =
  | 'subscription_payment_success'
  | 'subscription_payment_failed'
  | 'subscription_payment_recovered';

export type WebhookPayload = {
  meta: {
    event_name: SubscriptionEventNames | SubscriptionInvoiceEventNames;
    custom_data?: { org_id: string };
  };
  data: Subscription;
};

export type EventName = WebhookPayload['meta']['event_name'];

export type Subscription = {
  type: 'subscriptions';
  id: string;
  attributes: {
    store_id: number;
    order_id: number;
    customer_id: number;
    order_item_id: number;
    product_id: number;
    variant_id: number;
    product_name: string;
    variant_name: string;
    user_name: string;
    user_email: string;
    status: SubscriptionStatus;
    status_formatted: string;
    pause: any | null;
    cancelled: boolean;
    trial_ends_at: string | null;
    billing_anchor: number;
    urls: {
      update_payment_method: string;
    };
    renews_at: string;
    /**
     * If the subscription has as status of cancelled or expired, this will be an ISO-8601 formatted date-time string indicating when the subscription expires (or expired). For all other status values, this will be null.
     */
    ends_at: string | null;
    created_at: string;
    updated_at: string;
    test_mode: boolean;
  };
};

export type SubscriptionStatus =
  | 'on_trial'
  | 'active'
  | 'paused'
  | 'past_due'
  | 'unpaid'
  | 'cancelled'
  | 'expired';
