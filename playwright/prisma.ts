import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const clearDB = async () => {
  await prisma.organization.deleteMany({});
  await prisma.subscription.deleteMany({});
  await prisma.verificationToken.deleteMany({});
};

export const MockOrg = async () => {
  const user = await prisma.user.create({ data: { email: 'testsubweb33@yahoo.com' } });
  const org = await prisma.organization.create({
    data: { name: 'org1', user: { connect: { id: user.id } } }
  });

  return org;
};

export const GetSubscriptionMock = async (id: string) => {
  const subscription = await prisma.subscription.findFirst({
    where: {
      id
    }
  });
  return subscription;
};

export const GetOrgMock = async (id: string) => {
  const organization = await prisma.organization.findFirst({
    where: {
      id
    }
  });
  return organization;
};

export const CreateSubscriptionMock = async ({ id, price_id, status, period_ends_at }) => {
  const data = {
    id,
    price_id,
    status,
    period_ends_at
  };

  await prisma.subscription.create({ data });
};
