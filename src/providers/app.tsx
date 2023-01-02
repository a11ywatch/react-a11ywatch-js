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

/**
 * Top level app provider. Wrap this around the entire app.
 * @param children children to render
 * @param persist persist values and restore and refresh
 * @example <caption>Example of using the provider</caption>
 * function Application(){
 *  return <A11yWatchProviderWrapper><App /><A11yWatchProviderWrapper />;
 * }
 * @returns {React.FC<React.PropsWithChildren<A11yWatchProps>>} Returns the top level provider for the app.
 */
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

/**
 * Top level app provider hook.
 * @example <caption>Example of using the hook</caption>
 * function App() {
 *  const { account } = useA11yWatchContext()
 *
 *  return <div>{account.email}</div>
 * }
 * function Application(){
 *  return <A11yWatchProviderWrapper><App /><A11yWatchProviderWrapper />;
 * }
 * @returns {{ account: Account, setAccountType }} Returns a hook of the top level provider to manage account state.
 */
export function useA11yWatchContext() {
  return useContext(AppContext);
}
