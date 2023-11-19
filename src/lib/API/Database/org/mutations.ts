'use server';

import prisma, { Prisma } from '../../Services/init/prisma';
import { GetUser } from '@/lib/API/Database/user/queries';
import { PrismaDBError } from '@/lib/utils/error';
import { OrgFormValues } from '@/lib/types/validations';

export const CreateOrg = async ({ name }: OrgFormValues) => {
  const user = await GetUser();
  const primary_email = user?.email;

  const data: Prisma.OrganizationCreateInput = {
    name,
    primary_email
  };

  try {
    const org = await prisma.organization.create({ data });
    return org;
  } catch (err) {
    PrismaDBError(err);
  }
};
