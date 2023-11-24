'use client';

import { defineAbilityFor } from '@/lib/utils/caslAbility';
import { AbilityContext } from '@/lib/utils/caslCan';
import { LayoutProps } from '@/lib/types/types';
import { RolesE } from '@/lib/types/enums';

interface AbilityProviderPropsI extends LayoutProps {
  role: RolesE;
  id: string;
}

export function AbilityProvider({ children, role, id }: AbilityProviderPropsI) {
  return (
    <AbilityContext.Provider value={defineAbilityFor(role, id)}>{children}</AbilityContext.Provider>
  );
}
