'use client';

import React, { createContext, useState } from 'react';

export const OrgContext = createContext({});

export const OrgContextProvider = ({ children }) => {
  const [orgId, setOrg] = useState('');

  return <OrgContext.Provider value={{ orgId, setOrg }}>{children}</OrgContext.Provider>;
};
