import 'server-only';

import prisma, { Prisma } from '../../Services/init/prisma';
import { GetUser } from '@/lib/API/Database/user/queries';
import { PrismaDBError } from '@/lib/utils/error';

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
