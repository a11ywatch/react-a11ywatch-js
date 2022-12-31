import React, { FunctionComponent } from "react";
// import { action } from "@storybook/addon-actions";
import { withA11y } from "@storybook/addon-a11y";
import { CheckoutForm } from "./checkout";
import { A11yWatchProvider } from "../../providers/app";
import { StripeProvider } from "../../providers/stripe";

export const Default = ({ children = "Default" }) => {
  return (
    <A11yWatchProvider>
      <StripeProvider>
        <CheckoutForm  />
      </StripeProvider>
    </A11yWatchProvider>
  )
};

export default {
  title: "CheckoutForm",
  decorators: [withA11y],
  component: CheckoutForm,
};
