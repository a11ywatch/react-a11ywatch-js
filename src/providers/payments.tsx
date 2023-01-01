"use client";

import React, { createContext, useContext, FC, PropsWithChildren } from "react";
import { Plans, PaymentPlan, usePayments } from "../hooks/payments";
import { useA11yWatchContext } from "./app";

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
  payments: defaultPayments, // todo: split hook from app context?
});

const PaymentsProviderBase = AppContext.Provider;

const PaymentsProviderWrapper: FC<PropsWithChildren<{}>> = ({ children }) => {
  const { account, setAccountType } = useA11yWatchContext();
  const payments = usePayments(setAccountType, account.jwt);

  return (
    <PaymentsProviderBase value={{ payments }}>{children}</PaymentsProviderBase>
  );
};

export const PaymentsProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  return <PaymentsProviderWrapper>{children}</PaymentsProviderWrapper>;
};

export function usePaymentsContext() {
  return useContext(AppContext);
}
