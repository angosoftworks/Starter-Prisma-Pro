'use server';

import clientLemon from '../init/payments';

interface SubscriptionPropsI {
  customer_id: string;
}

export const GetBillingUrl = async ({ customer_id }: SubscriptionPropsI): Promise<string> => {
  const id = Number(customer_id);
  const res = await clientLemon.getCustomer({ id });

  // @ts-expect-error, wrong types on lemon.js
  return res.data.attributes.urls.customer_portal;
};
