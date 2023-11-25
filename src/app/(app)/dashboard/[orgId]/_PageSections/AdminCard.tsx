'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { useAbility } from '@casl/react';
import { AbilityContext } from '@/lib/utils/caslContext';
import { RoleContext } from '@/lib/utils/roleContext';
import { Actions, RolesE, Subjects } from '@/lib/types/enums';
import { TestRole } from '@/lib/API/Database/roles/helpers';
import { Button } from '@/components/ui/Button';
import { useContext } from 'react';

interface AdminCardPropsI {
  id: string;
}

export default function AdminCard({ id }: AdminCardPropsI) {
  const ability = useAbility(AbilityContext);
  const role = useContext(RoleContext);

  const handleSubmit = async ({ action, subject }) => {
    const permissions = {
      role,
      action,
      subject
    };

    const res = await TestRole({ test: 'test', permissions });
    console.log(res);
  };

  return (
    <div className="lg:max-w-lg">
      <Card className="bg-background-light dark:bg-background-dark">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">RBAC Example</CardTitle>
          <CardDescription>Examples of RBAC</CardDescription>
        </CardHeader>

        <CardContent>
          {ability.can(Actions.READ, Subjects.TODO) && <div>All Roles can See This</div>}
          {ability.can(Actions.UPDATE, { type: Subjects.TODO, id }) && (
            <div>Member Role Can see This if User Id matches, Owner and Admin can See</div>
          )}
          {ability.can(Actions.READ, Subjects.SUBSCRIPTION) && (
            <div>Admin and Owner Roles can See This</div>
          )}
          {ability.can(Actions.DELETE, Subjects.SUBSCRIPTION) && <div>Only Owner can See This</div>}
          <Button onClick={() => handleSubmit({ action: Actions.READ, subject: Subjects.TODO })}>
            Submit
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
