"use client";

import React, { createContext, useContext, FC, PropsWithChildren } from "react";
import { useAccount } from "../hooks/account";
import { Plans, PaymentPlan, usePayments } from "../hooks/payments";

const defaultAccount = {
  activeSubscription: false,
  authed: false,
  email: "",
  jwt: "",
  role: 0,
};

const defaultPayments = {
  selected: undefined as PaymentPlan | undefined,
  plans: [] as PaymentPlan[] | undefined,
  // defaults
  paymentPlans: undefined as Plans | undefined,
  highPlan: false,
  yearly: false,
  selectedPlan: -1,
  setPaymentPlans: (_x: any) => {},
  setHighPlan: (_x: any) => {},
  setYearly: (_x: any) => {},
  setSelected: (_x: any) => {},
  onToken: (_x: any) => {},
};

const AppContext = createContext({
  account: defaultAccount,
  setAccountType: (_x: typeof defaultAccount) => {},
  payments: defaultPayments, // todo: split hook from app context?
});

const A11yWatchProviderBase = AppContext.Provider;

const A11yWatchProviderWrapper: FC<PropsWithChildren<{}>> = ({ children }) => {
  const { account, setAccountType } = useAccount();
  const payments = usePayments(setAccountType, account.jwt);

  return (
    <A11yWatchProviderBase value={{ account, setAccountType, payments }}>
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
