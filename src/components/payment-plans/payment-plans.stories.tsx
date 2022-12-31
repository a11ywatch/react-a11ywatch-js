import React, { FunctionComponent } from "react";
// import { action } from "@storybook/addon-actions";
import { withA11y } from "@storybook/addon-a11y";
import { PaymentsPlans } from "./payment-plans";
import { A11yWatchProvider } from "../../providers/app";

export const Default = ({ children = "Default" }) => {
  return (
    <A11yWatchProvider>
      <PaymentsPlans />
    </A11yWatchProvider>
  );
};

export default {
  title: "PaymentsPlans",
  decorators: [withA11y],
  component: PaymentsPlans,
};
