'use server';
import clientLemon from '../init/lemonsqueezy';

import { GetUser } from '../../Database/user/queries';
import { GetOrg } from '../../Database/org/queries';
import configuration from '@/lib/config/site';
import routes from '@/lib/config/routes';
import config from '@/lib/config/dashboard';

interface createCheckoutProps {
  price_id: number;
  org_id: string;
}

export const createCheckoutSession = async ({ price_id, org_id }: createCheckoutProps) => {
  const user = await GetUser();
  const email = user.email;
  const org = await GetOrg({ id: org_id });

  if (user.id !== org.owner_user_id) {
    throw 'Unauthorized Operation';
  }

  const origin = configuration.url;

  let attributes = {
    checkout_data: {
      email,
      custom: {
        org_id
      }
    },
    product_options: {
      redirect_url: `${origin}/${routes.redirects.user.toUserDashboard}`
    }
  };

  const res = await clientLemon.createCheckout({
    storeId: config.storeId,
    variantId: price_id,
    attributes
  });
  return res;
};
