import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const clearDB = async () => {
  await prisma.organization.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.subscription.deleteMany({});
  await prisma.verificationToken.deleteMany({});
};

export const MockOrg = async () => {
  const user = await prisma.user.create({ data: { email: 'test223@yahoo.com' } });
  const org = await prisma.organization.create({
    data: { name: 'org1', user: { connect: { id: user.id } } }
  });

  return org.id;
};
