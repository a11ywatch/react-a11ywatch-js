import React from "react";
import { withA11y } from "@storybook/addon-a11y";
import { CheckoutForm } from "./checkout";
import { A11yWatchProvider } from "../../providers/app";
import { StripeProvider } from "../../providers/stripe";
import { PaymentsProvider } from "../../providers/payments";

export const Default = ({ children = "Default" }) => {
  return (
    <A11yWatchProvider persist>
      <PaymentsProvider>
        <StripeProvider>
          <CheckoutForm />
        </StripeProvider>
      </PaymentsProvider>
    </A11yWatchProvider>
  );
};

export default {
  title: "CheckoutForm",
  decorators: [withA11y],
  component: CheckoutForm,
};
