import { AbilityBuilder, createMongoAbility, AnyAbility } from '@casl/ability';
import { defineAbility } from '@casl/ability';

import { createContext } from 'react';
import { createContextualCan } from '@casl/react';
import { RolesE } from '../types/enums';

enum Actions {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
  MANAGE = 'manage'
}

enum Subjects {
  SUBSCRIPTION = 'Subscription',
  TODO = 'Todo',
  USER = 'User',
  ALL = 'all'
}

export const AbilityContext = createContext(null);
export const Can = createContextualCan(AbilityContext.Consumer);

const permissions = {
  owner: [{ action: Actions.MANAGE, subject: Subjects.ALL }],
  admin: [{ action: Actions.READ, subject: Subjects.ALL }],
  member: [{ action: Actions.CREATE, subject: Subjects.TODO }]
};

export function defineAbilityFor(role: RolesE) {
  return defineAbility((can, cannot) => {
    if (role === RolesE.OWNER) {
      permissions.owner.forEach((permission) => can(permission.action, permission.subject));
    } else if (role === RolesE.ADMIN) {
      permissions.admin.forEach((permission) => can(permission.action, permission.subject));
    } else if (role === RolesE.MEMBER) {
      permissions.member.forEach((permission) => can(permission.action, permission.subject));
    } else {
      throw 'Invalid Role';
    }
  });
}

interface UpdateAbilityPropsI {
  ability: AnyAbility;
  role: RolesE;
}

export function updateAbility({ ability, role }: UpdateAbilityPropsI) {
  const { can, rules } = new AbilityBuilder(createMongoAbility);

  if (role === RolesE.OWNER) {
    permissions.owner.forEach((permission) => can(permission.action, permission.subject));
  } else if (role === RolesE.ADMIN) {
    permissions.admin.forEach((permission) => can(permission.action, permission.subject));
  } else if (role === RolesE.MEMBER) {
    permissions.member.forEach((permission) => can(permission.action, permission.subject));
  } else {
    throw 'Invalid Role';
  }

  ability.update(rules);
}

//let defaultRole = null;

//export const ability = buildAbilityFor(defaultRole);
