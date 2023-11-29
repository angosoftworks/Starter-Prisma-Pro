'use server';

import clientLemon from '../init/lemonsqueezy';

interface CustomerPropsI {
  customer_id: number;
}

export const GetCustomer = async ({ customer_id }: CustomerPropsI) => {
  const res = await clientLemon.getCustomer({ id: customer_id });

  return res;
};
