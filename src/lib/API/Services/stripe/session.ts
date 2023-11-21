'use server';

import stripe from '@/lib/API/Services/init/stripe';
import { PortalSessionT } from '@/lib/types/stripe';
import Stripe from 'stripe';
import { StripeError } from '@/lib/utils/error';
import { GetOrg } from '../../Database/org/queries';
import configuration from '@/lib/config/site';
import routes from '@/lib/config/routes';
import { GetUser } from '../../Database/user/queries';
interface createCheckoutProps {
  price: string;
  org_id: string;
}

interface createPortalPropsI {
  org_id: string;
}

export const createCheckoutSession = async ({ price, org_id }: createCheckoutProps) => {
  const user = await GetUser();
  const customer_email = user.email;
  const org = await GetOrg({ id: org_id });

  if (user.id !== org.owner_user_id) {
    throw 'Unauthorized Operation';
  }

  const origin = configuration.url;
  let session: Stripe.Checkout.Session;

  try {
    session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price,
          quantity: 1
        }
      ],
      mode: 'subscription',
      success_url: `${origin}${routes.redirects.user.toUserDashboard}`,
      cancel_url: `${origin}${routes.redirects.user.toUserDashboard}`,
      metadata: {
        org_id
      },
      customer_email
      //subscription_data: {
      //  trial_period_days: 14
      //}
    });
  } catch (err) {
    StripeError(err);
  }

  return session;
};

export const createPortalSession = async ({
  org_id
}: createPortalPropsI): Promise<PortalSessionT> => {
  let portalSession: PortalSessionT;

  const org = await GetOrg({ id: org_id });
  const customer = org?.stripe_customer_id;
  const origin = configuration.url;

  try {
    portalSession = await stripe.billingPortal.sessions.create({
      customer,
      return_url: `${origin}${routes.redirects.user.toUserDashboard}`
    });
  } catch (err) {
    StripeError(err);
  }

  return portalSession;
};
