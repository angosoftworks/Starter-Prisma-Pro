'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { useAbility } from '@casl/react';
import { AbilityContext } from '@/lib/utils/caslCan';
import { Actions, RolesE, Subjects } from '@/lib/types/enums';
import { TestRole } from '@/lib/API/Database/roles/helpers';
import { Button } from '@/components/ui/Button';
import { CheckPermission } from '@/lib/API/Database/roles/helpers';

interface AdminCardPropsI {
  id: string;
}

export default function AdminCard({ id }: AdminCardPropsI) {
  const ability = useAbility(AbilityContext);

  const Handlesubmit = async ({ action, subject }) => {
    const permissions = {
      role: RolesE.MEMBER,
      action,
      subject: Subjects.SUBSCRIPTION
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
          <Button onClick={() => Handlesubmit({ action: Actions.READ, subject: Subjects.TODO })}>
            FFFFFF
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
