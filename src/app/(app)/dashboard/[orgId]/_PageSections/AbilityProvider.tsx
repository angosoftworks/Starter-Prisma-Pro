'use client';

import { AbilityContext, defineAbilityFor } from '@/lib/utils/caslAbility';
import { LayoutProps } from '@/lib/types/types';
import { RolesE } from '@/lib/types/enums';

interface AbilityProviderPropsI extends LayoutProps {
  role: RolesE;
}

export function AbilityProvider({ children, role }: AbilityProviderPropsI) {
  return (
    <AbilityContext.Provider value={defineAbilityFor(role)}>{children}</AbilityContext.Provider>
  );
}
