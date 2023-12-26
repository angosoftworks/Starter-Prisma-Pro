'use server';

import prisma, { Prisma } from '../../Services/init/prisma';
import { PrismaDBError } from '@/lib/utils/error';
import { Subscription } from '@prisma/client';

interface UpdateOrgSubPropsT {
  org_id: string;
  customer_id: number;
  subscription_id: string;
}

export const UpdateOrgSubscription = async ({
  org_id,
  customer_id,
  subscription_id
}: UpdateOrgSubPropsT) => {
  const data: Prisma.OrganizationUpdateInput = {
    customer_id,
    subscription: { connect: { id: subscription_id } }
  };

  try {
    await prisma.organization.update({
      where: {
        id: org_id
      },
      data
    });
  } catch (err) {
    PrismaDBError(err);
  }
};

export const CreateSubscription = async ({
  id,
  price_id,
  status,
  period_ends_at
}: Subscription) => {
  const data: Prisma.SubscriptionCreateInput = {
    id,
    price_id,
    status,
    period_ends_at
  };

  try {
    await prisma.subscription.create({ data });
  } catch (err) {
    PrismaDBError(err);
  }
};

export const UpdateSubscription = async ({
  id,
  price_id,
  status,
  period_ends_at
}: Partial<Subscription>) => {
  const data: Prisma.SubscriptionUpdateInput = {
    price_id,
    status,
    period_ends_at
  };

  try {
    await prisma.subscription.update({
      where: {
        id
      },
      data
    });
  } catch (err) {
    PrismaDBError(err);
  }
};
