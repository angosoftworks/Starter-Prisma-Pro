'use server';

import prisma, { Prisma } from '../../Services/init/prisma';
import { GetUser } from '@/lib/API/Database/user/queries';
import { RolesE } from '@/lib/types/enums';
import { PrismaDBError } from '@/lib/utils/error';

interface CreateRoleI {
  org_id: string;
  role: RolesE;
  org_name: string;
}

export const CreateRole = async ({ org_id, role, org_name }: CreateRoleI) => {
  const user = await GetUser();
  const user_id = user?.id;

  const data: Prisma.RoleCreateInput = {
    user: { connect: { id: user_id } },
    organization: { connect: { id: org_id, name: org_name } },
    role
  };

  try {
    await prisma.role.create({ data });
  } catch (err) {
    PrismaDBError(err);
  }
};
