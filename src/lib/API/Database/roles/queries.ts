import 'server-only';

import prisma, { Prisma } from '../../Services/init/prisma';
import { GetUser } from '@/lib/API/Database/user/queries';
import { PrismaDBError } from '@/lib/utils/error';
import { equal } from 'assert';
import { Role } from '@prisma/client';

export const GetRolesByUserId = async () => {
  const user = await GetUser();
  const user_id = user?.id;

  try {
    const roles = await prisma.role.findMany({
      where: {
        user_id
      }
    });

    return roles;
  } catch (err) {
    PrismaDBError(err);
  }
};

interface GetRolePropsI {
  org_id: string;
  user_id: string;
}

export const GetRoleByUserIdAndOrgId = async ({
  org_id,
  user_id
}: GetRolePropsI): Promise<Role> => {
  try {
    const roles = await prisma.role.findFirst({
      where: {
        AND: {
          user_id: { equals: user_id },
          org_id: { equals: org_id }
        }
      }
    });

    return roles;
  } catch (err) {
    PrismaDBError(err);
  }
};
