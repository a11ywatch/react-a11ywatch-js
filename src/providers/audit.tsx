"use client";

import React, { createContext, useContext, FC, PropsWithChildren } from "react";
import { useAudit } from "../hooks/audit";
import { useA11yWatchContext } from "./app";
import type { Report } from "../types";

const defaultAudit = {
  report: null as Report | Map<string, Report> | null | undefined,
  loading: false,
  url: "",
  performAudit: (_x: any) => {},
  onChangeUrl: (_x: any) => {},
  dispatchReport: (_x: any) => {},
};

const AppContext = createContext({
  audit: defaultAudit, // todo: split hook from app context?
});

const AuditProviderBase = AppContext.Provider;

type AuditProviderProps = {
  persist?: string | boolean; // persist values by key or top level
  multi?: boolean; // multi page audit
};

const AuditProviderWrapper: FC<PropsWithChildren<AuditProviderProps>> = ({
  children,
  persist,
  multi,
}) => {
  const { account } = useA11yWatchContext();
  const audit = useAudit({ jwt: account.jwt, persist, multi });

  return <AuditProviderBase value={{ audit }}>{children}</AuditProviderBase>;
};

/**
 * Audit provider to bind input and list results.
 * @param children children to render
 * @param multi perform multi page audit
 * @param persist persist values and restore and refresh
 * @example <caption>Example of using the provider</caption>
 * function Auditer(){
 *   return (
 *     <AuditProviderWrapper>
 *        <AuditForm />
 *        <AuditList />
 *     </AuditProviderWrapper>
 *   );
 * }
 * @returns {React.FC<React.PropsWithChildren<{}>>} Returns the audit provider.
 */
export const AuditProvider: FC<PropsWithChildren<AuditProviderProps>> = ({
  children,
  persist,
  multi,
}) => {
  return (
    <AuditProviderWrapper persist={persist} multi={multi}>
      {children}
    </AuditProviderWrapper>
  );
};

export function useAuditContext() {
  return useContext(AppContext);
}
