import { UpdateOrgSubscription } from '../../Database/subscription/mutations';
import { CreateSubscription, UpdateSubscription } from '../../Database/subscription/mutations';
import { Subscription } from '@prisma/client';

import { WebhookPayload, WebhookEventsE } from '@/lib/API/Services/payments/lemonTypes';

import ls from '../init/payments';

export const WebhookEventHandler = async (event: WebhookPayload) => {
  // Handle the event
  switch (event.meta.event_name) {
    case WebhookEventsE.SUBSCRIPTION_CREATED: {
      const dataSub: Subscription = {
        id: event.data.id.toString(),
        price_id: event.data.attributes.variant_id.toString(),
        status: event.data.attributes.status,
        period_ends_at: new Date(event.data.attributes.billing_anchor * 1000)
      };

      await CreateSubscription(dataSub);

      console.log('Subscription Created');

      const dataOrg = {
        org_id: event.meta.custom_data.org_id,
        customer_id: String(event.data.attributes.customer_id),
        subscription_id: String(event.data.id)
      };

      await UpdateOrgSubscription(dataOrg);

      console.log('Customer Created');
      break;
    }
    case WebhookEventsE.SUBSCRIPTION_UPDATED: {
      const isSubscriptionExists = await ls.getSubscription({ id: Number(event.data.id) });
      if (!isSubscriptionExists) {
        throw 'Subscription Not Found';
      }

      const dataSub: Subscription = {
        id: event.data.id.toString(),
        price_id: event.data.attributes.variant_id.toString(),
        status: event.data.attributes.status,
        period_ends_at: new Date(event.data.attributes.billing_anchor * 1000)
      };

      await UpdateSubscription(dataSub);
      console.log('Subscription Updated');
      break;
    }
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.meta.event_name}.`);
  }
};
