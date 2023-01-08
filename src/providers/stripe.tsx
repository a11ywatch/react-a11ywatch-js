"use client";

import React, { memo, PropsWithChildren, useEffect, useState } from "react";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { API_URL } from "../config/api";

// get the a11ywatch stripe key
export const getStripeKey = async () => {
  const res = await fetch(`${API_URL}/api/client-key`);

  let secret = "";

  if (res.ok) {
    try {
      const json = await res.json();

      secret = json?.data?.client_secret;
    } catch (e) {
      console.error(e);
    }
  }

  return secret;
};

type StripeProps = {
  secret?: string; // optional: stripe secret if manually using `getStripeKey` during another event.
};

// Load stripe Elements
export const StripProviderWrapper = ({
  children,
  secret,
}: PropsWithChildren<StripeProps>) => {
  const [stripePromise, setStripe] = useState<Stripe | null>(null);

  useEffect(() => {
    if (!stripePromise) {
      (async () => {
        try {
          // fetch the A11yWatch Stripe client key for stripe
          const ssecret = secret ? secret : await getStripeKey();

          if (ssecret) {
            const stripeObject = await loadStripe(ssecret);

            if (stripeObject) {
              setStripe(stripeObject);
            }
          }
        } catch (e) {
          console.error(e);
        }
      })();
    }
  }, [stripePromise, secret]);

  return <Elements stripe={stripePromise}>{children}</Elements>;
};

export const StripeProvider = memo(StripProviderWrapper);
