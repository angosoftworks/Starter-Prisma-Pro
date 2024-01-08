import { UpdateOrgSubscription } from '../../Database/subscription/mutations';
import { CreateSubscription, UpdateSubscription } from '../../Database/subscription/mutations';
import { Subscription } from '@prisma/client';

import { WebhookPayload, WebhookEventsE } from '@/lib/API/Services/payments/lemonTypes';

export const WebhookEventHandler = async (event: WebhookPayload) => {
  // Handle the event
  switch (event.meta.event_name) {
    case WebhookEventsE.SUBSCRIPTION_CREATED:
      let dataSub: Subscription = {
        id: event.data.id,
        price_id: event.data.attributes.variant_id.toString(),
        status: event.data.attributes.status,
        period_ends_at: new Date(event.data.attributes.billing_anchor * 1000)
      };

      await CreateSubscription(dataSub);

      console.log('Subscription Created');

      const dataOrg = {
        org_id: event.meta.custom_data.org_id,
        customer_id: event.data.attributes.customer_id,
        subscription_id: event.data.id
      };

      await UpdateOrgSubscription(dataOrg);

      console.log('Customer Created');
      break;
    case WebhookEventsE.SUBSCRIPTION_UPDATED:
      let dataSubUpdate: Subscription = {
        id: event.data.id,
        price_id: event.data.attributes.variant_id.toString(),
        status: event.data.attributes.status,
        period_ends_at: new Date(event.data.attributes.billing_anchor * 1000)
      };

      await UpdateSubscription(dataSubUpdate);
      console.log('Subscription Updated');
      break;
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.meta.event_name}.`);
  }
};
