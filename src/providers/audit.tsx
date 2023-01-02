"use client";

import React, { createContext, useContext, FC, PropsWithChildren } from "react";
import { useAudit, Report } from "../hooks/audit";
import { useA11yWatchContext } from "./app";

const defaultAudit = {
  report: null as Report | null | undefined,
  loading: false,
  performAudit: (_x: any) => {},
};

const AppContext = createContext({
  audit: defaultAudit, // todo: split hook from app context?
});

const AuditProviderBase = AppContext.Provider;

const AuditProviderWrapper: FC<PropsWithChildren<{}>> = ({ children }) => {
  const { account } = useA11yWatchContext();
  const audit = useAudit(account.jwt);

  return <AuditProviderBase value={{ audit }}>{children}</AuditProviderBase>;
};

export const AuditProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  return <AuditProviderWrapper>{children}</AuditProviderWrapper>;
};

export function useAuditContext() {
  return useContext(AppContext);
}
