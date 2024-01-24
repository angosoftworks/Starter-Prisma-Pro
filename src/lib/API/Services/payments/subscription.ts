'use server';
import stripe from '@/lib/API/Services/init/payments';
import routes from '@/lib/config/routes';
import Stripe from 'stripe';

import configuration from '@/lib/config/site';

interface createProtalProps {
  payments_id: string;
}

export const GetBillingUrl = async ({ payments_id }: createProtalProps): Promise<string> => {
  let portalSession: Stripe.BillingPortal.Session;
  const customer = payments_id;

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
