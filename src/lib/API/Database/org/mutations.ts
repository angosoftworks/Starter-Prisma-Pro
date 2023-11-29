'use server';

import prisma, { Prisma } from '../../Services/init/prisma';
import { GetUser } from '@/lib/API/Database/user/queries';
import { PrismaDBError } from '@/lib/utils/error';
import { OrgFormSchema, OrgFormValues } from '@/lib/types/validations';

interface UpdateOrgSubPropsT {
  org_id: string;
  customer_id: number;
  subscription_id: string;
}

export const CreateOrg = async ({ name }: OrgFormValues) => {
  const user = await GetUser();
  const user_id = user?.id;

  const data: Prisma.OrganizationCreateInput = {
    name,
    user: { connect: { id: user_id } }
  };

  try {
    const org = await prisma.organization.create({ data });
    return org;
  } catch (err) {
    PrismaDBError(err);
  }
};

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

interface UpdateOrgNamePropsI extends OrgFormValues {
  org_id: string;
}

export const UpdateOrgName = async ({ name, org_id }: UpdateOrgNamePropsI) => {
  const data: Prisma.OrganizationUpdateInput = { name };

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
