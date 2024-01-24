'use server';

import clientLemon from '../init/payments';

interface SubscriptionPropsI {
  payments_id: string;
}

export const GetBillingUrl = async ({ payments_id }: SubscriptionPropsI): Promise<string> => {
  const id = Number(payments_id);
  const res = await clientLemon.getSubscription({ id });

  // @ts-expect-error, wrong types on lemon.js
  const resUrl = res.data.attributes.urls.customer_portal;

  return resUrl;
};
