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
  const { org_id, org_name } = role;

  return (
    <div className="my-6">
      <Link href={`/dashboard/${org_id}/main`}>
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
        <CardTitle>Aucun projet détecté</CardTitle>
        <CardDescription>Clique ici pour créer un projet et propulser ton jeu vidéo aux standards AAA.</CardDescription>
      </CardHeader>
      <CardContent>
        <Link
          href={`/user/create-org`}
          className={cn(buttonVariants({ variant: 'secondary', size: 'lg' }), 'mr-6')}
        >
          C'est parti ! 🚀
        </Link>
      </CardContent>
    </Card>
  );
};

const MyRoles = ({ roles }: MyRolesProps) => {
  return (
    <div>
      <h1 className="text-xl font-bold mb-6">Mes projets :</h1>
      {roles?.length !== 0 ? (
        roles?.map((role) => <RoleCard key={role.id} role={role} />)
      ) : (
        <CreateRoleCard />
      )}
    </div>
  );
};

export default MyRoles;
