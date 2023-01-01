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

const A11yWatchProviderWrapper: FC<PropsWithChildren<{}>> = ({ children }) => {
  const { account, setAccountType } = useAccount();

  return (
    <A11yWatchProviderBase value={{ account, setAccountType }}>
      {children}
    </A11yWatchProviderBase>
  );
};

export const A11yWatchProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  return <A11yWatchProviderWrapper>{children}</A11yWatchProviderWrapper>;
};

export function useA11yWatchContext() {
  return useContext(AppContext);
}
