"use client";

import React, { createContext, useContext, FC, PropsWithChildren } from "react";
import { useAccount } from "../hooks/account";

const defaultAccount = {
  activeSubscription: false,
  authed: false,
  email: "",
  jwt: "",
  role: 0,
};

const AppContext = createContext({
  account: defaultAccount,
  setAccountType: (_x: typeof defaultAccount) => {},
});

const A11yWatchProviderBase = AppContext.Provider;

type A11yWatchProps = { persist?: boolean };

const A11yWatchProviderWrapper: FC<PropsWithChildren<A11yWatchProps>> = ({
  children,
  persist,
}) => {
  const { account, setAccountType } = useAccount(persist);

  return (
    <A11yWatchProviderBase value={{ account, setAccountType }}>
      {children}
    </A11yWatchProviderBase>
  );
};

export const A11yWatchProvider: FC<PropsWithChildren<A11yWatchProps>> = ({
  children,
  persist,
}) => {
  return (
    <A11yWatchProviderWrapper persist={persist}>
      {children}
    </A11yWatchProviderWrapper>
  );
};

export function useA11yWatchContext() {
  return useContext(AppContext);
}
