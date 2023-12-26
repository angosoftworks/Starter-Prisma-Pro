import { PrismaClient } from '@prisma/client';
import { CreateSubscription } from '@/lib/API/Database/subscription/mutations';
import { CreateOrg, UpdateOrgSubscription } from '@/lib/API/Database/org/mutations';

const prisma = new PrismaClient();

export const clearDB = async () => {
  await prisma.organization.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.subscription.deleteMany({});
  await prisma.verificationToken.deleteMany({});
};

export const MockSubscription = async () => {
  await CreateOrg;
};
