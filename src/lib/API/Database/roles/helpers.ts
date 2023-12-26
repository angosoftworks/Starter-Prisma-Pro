'use server';

import prisma, { Prisma } from '../../Services/init/prisma';
import { GetUser } from '@/lib/API/Database/user/queries';
import { PrismaDBError } from '@/lib/utils/error';
import { Role } from '@prisma/client';
import { ForbiddenError } from '@casl/ability';
import { defineAbilityFor } from '@/lib/utils/caslAbility';
import { Actions, RolesE, Subjects } from '@/lib/types/enums';

interface TestRolePropsI extends PermissionsI {
  test: string;
}

export interface PermissionsI {
  permissions: {
    role: RolesE;
    action: Actions;
    subject: Subjects;
  };
}

export const TestRole = async ({ test, permissions }: TestRolePropsI) => {
  const { role, action, subject } = permissions;
  await CheckPermission({ role, action, subject });
};

export const CheckPermission = async ({ role, action, subject }) => {
  ForbiddenError.setDefaultMessage(
    (error) => `You are not allowed to ${error.action} on ${error.subjectType}`
  );

  const user = await GetUser();
  const user_id = user?.id;

  ForbiddenError.from(defineAbilityFor(role, user_id)).throwUnlessCan(action, subject);
};
