import stripe from '@/lib/API/Services/init/payments';
import routes from '@/lib/config/routes';
import Stripe from 'stripe';

import configuration from '@/lib/config/site';

interface createProtalProps {
  customer_id: string;
}

export const GetBillingUrl = async ({ customer_id }: createProtalProps): Promise<string> => {
  let portalSession: Stripe.BillingPortal.Session;
  const customer = customer_id;

  const origin = configuration.url;

  try {
    portalSession = await stripe.billingPortal.sessions.create({
      customer,
      return_url: `${origin}${routes.redirects.user.toUserDashboard}`
    });
  } catch (err) {
    throw err;
  }

  return portalSession.url;
};

export const RetrieveSubscription = async (
  subscription_id: string
): Promise<Stripe.Subscription> => {
  let subscription: Stripe.Subscription;

  try {
    subscription = await stripe.subscriptions.retrieve(subscription_id as string);
  } catch (err) {
    throw err;
  }

  return subscription;
};
