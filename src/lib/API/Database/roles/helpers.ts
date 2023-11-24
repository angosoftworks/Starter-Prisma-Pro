'use server';

import prisma, { Prisma } from '../../Services/init/prisma';
import { GetUser } from '@/lib/API/Database/user/queries';
import { PrismaDBError } from '@/lib/utils/error';
import { Role } from '@prisma/client';

export const TestRole = async () => {
  console.log('FFFF');
};
