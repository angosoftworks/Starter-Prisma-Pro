import Stripe from 'stripe';
import { UpdateOrgSubscription } from '@/lib/API/Database/subscription/mutations';
import { CreateSubscription, UpdateSubscription } from '@/lib/API/Database/subscription/mutations';
import { Subscription } from '@prisma/client';
import { RetrieveSubscription } from './subscription';

enum WebhookEventsE {
  CheckoutSessionCompleted = 'checkout.session.completed',
  CustomerSubscriptionUpdated = 'customer.subscription.updated'
}

const WebhookEvents = {
  customer_subscription_updated: WebhookEventsE.CustomerSubscriptionUpdated,
  checkout_session_completed: WebhookEventsE.CheckoutSessionCompleted
};

export const WebhookEventHandler = async (event: Stripe.Event) => {
  // Handle the event
  switch (event.type) {
    case WebhookEvents.checkout_session_completed: {
      //@ts-expect-error, update function props to string for customer_id
      const subscriptionId = event.data.object.subscription;

      const subscription: Stripe.Subscription = await RetrieveSubscription(subscriptionId);
      const org_id = event.data.object.metadata.org_id;
      console.log(subscription);

      const customer_id = subscription.customer as string;
      const statusSub = subscription.status as string;

      const dataSub: Subscription = {
        id: subscriptionId,
        price_id: subscription.items.data[0].price.id,
        status: statusSub,
        period_ends_at: new Date(subscription.current_period_end * 1000)
      };

      await CreateSubscription(dataSub);

      console.log('Stripe Subscription Created');

      const dataOrg = {
        org_id,
        customer_id,
        subscription_id: subscription.id
      };

      await UpdateOrgSubscription(dataOrg);

      console.log('Stripe Customer Created');
      break;
    }
    case WebhookEvents.customer_subscription_updated: {
      // Incorrect infered type, need to override.
      const subscriptionUpdate = event.data.object as unknown as Stripe.Subscription;

      console.log(event);
      const dataSub: Subscription = {
        id: subscriptionUpdate.id,
        price_id: subscriptionUpdate.items.data[0].price.id,
        status: subscriptionUpdate.status,
        period_ends_at: new Date(subscriptionUpdate.current_period_end * 1000)
      };

      await UpdateSubscription(dataSub);
      console.log('Stripe Subscription Updated');
      break;
    }
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`);
      throw `Unhandled Event Type ${event.type}`;
  }
};
