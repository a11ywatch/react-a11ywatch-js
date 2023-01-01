import React from "react";
import { withA11y } from "@storybook/addon-a11y";
import { PaymentsPlans } from "./payment-plans";
import { A11yWatchProvider } from "../../providers/app";
import { PaymentsProvider } from "../../providers/payments";

export const Default = ({ children = "Default" }) => {
  return (
    <A11yWatchProvider>
      <PaymentsProvider>
        <PaymentsPlans />
      </PaymentsProvider>
    </A11yWatchProvider>
  );
};

export default {
  title: "PaymentsPlans",
  decorators: [withA11y],
  component: PaymentsPlans,
};
