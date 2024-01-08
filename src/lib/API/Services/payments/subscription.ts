'use server';

import clientLemon from '../init/lemonsqueezy';

interface SubscriptionPropsI {
  subscription_id: number;
}

export const GetSubscription = async ({ subscription_id }: SubscriptionPropsI) => {
  const res = await clientLemon.getSubscription({ id: subscription_id });

  return res;
};
