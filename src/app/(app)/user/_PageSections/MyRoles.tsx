'use client';

import { Card, CardDescription, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { buttonVariants } from '@/components/ui/Button';
import Link from 'next/link';
import { cn } from '@/lib/utils/helpers';

import { Role } from '@prisma/client';

interface RoleCardProps {
  role: Role;
}

interface MyRolesProps {
  roles: Role[];
}

const RoleCard = ({ role }: RoleCardProps) => {
  const { id, org_name } = role;

  return (
    <div>
      <Link href={`/dashboard/${id}/main`}>
        <Card>
          <CardHeader>
            <CardTitle>{org_name}</CardTitle>
            <CardDescription>Role: {role.role}</CardDescription>
          </CardHeader>
          <CardContent>Click Go To Organization Dashboard</CardContent>
        </Card>
      </Link>
    </div>
  );
};

const CreateRoleCard = () => {
  return (
    <Card className="bg-background-light dark:bg-background-dark">
      <CardHeader>
        <CardTitle>No Organizations and Roles Found</CardTitle>
        <CardDescription>Click below to create an Organization to get Started</CardDescription>
      </CardHeader>
      <CardContent>
        <Link
          href={`/user/create-org`}
          className={cn(buttonVariants({ variant: 'secondary', size: 'lg' }), 'mr-6')}
        >
          Get Started
        </Link>
      </CardContent>
    </Card>
  );
};

const MyRoles = ({ roles }: MyRolesProps) => {
  return (
    <div>
      {roles?.length !== 0 ? (
        roles?.map((role) => <RoleCard key={role.id} role={role} />)
      ) : (
        <CreateRoleCard />
      )}
    </div>
  );
};

export default MyRoles;
