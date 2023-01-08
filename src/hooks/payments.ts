import { useState } from "react";
import { Token } from "@stripe/stripe-js";
import { API_URL } from "../config/api";

export type PaymentPlan = {
  title: string;
  details: string[];
  cost: string;
  costYearly: string;
  pageCount: number;
};

export interface Plans {
  lPlans: PaymentPlan[];
  hPlans: PaymentPlan[];
  feats: string[];
}

// basic account details
export const usePayments = (
  setAccountType: (user: any) => any,
  jwt: string
) => {
  const [paymentPlans, setPaymentPlans] = useState<Plans>();
  const [highPlan, setHighPlan] = useState<boolean>(false);
  const [yearly, setYearly] = useState<boolean>(false);
  const [selectedPlan, setSelected] = useState<number>(0);
  const [error, setError] = useState<string>("");

  const plans =
    paymentPlans && (highPlan ? paymentPlans.hPlans : paymentPlans.lPlans);
  const selected = plans && plans[selectedPlan];

  const onToken = async (token: Token) => {
    // send token plus account information to account upgrade
    try {
      // fetch the paymentPlans for A11yWatch
      const res = await fetch(`${API_URL}/api/upgrade`, {
        method: "POST",
        body: JSON.stringify({
          stripeToken: token, // the stripe token with payment info
          yearly, // is yearly plan
          paymentPlan: selected?.title ?? "L1", // the selected plan
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`, // set the auth token from login
        },
      });
      const json = await res.json();
      const user = json?.data;

      if (user) {
        if (error) {
          setError("");
        }
        setAccountType({
          authed: true,
          email: user.email,
          jwt: user.jwt,
          role: user.role,
          activeSubscription: user.activeSubscription,
        });
      } else {
        setError(json?.message ?? "Error with API.");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return {
    // active
    selected: selected,
    plans,
    // defaults
    paymentPlans,
    highPlan,
    yearly,
    selectedPlan,
    setPaymentPlans,
    setHighPlan,
    setYearly,
    setSelected,
    onToken,
    error,
  };
};
