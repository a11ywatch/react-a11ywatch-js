import React from "react";
import { withA11y } from "@storybook/addon-a11y";
import { AuditForm } from "./audit-input";
import { A11yWatchProvider } from "../../providers/app";
import { AuditProvider } from "../../providers/audit";
import { AuditList } from "../lists/audit-list";

export const Default = ({ children = "Default" }) => {
  return (
    <A11yWatchProvider persist>
      <AuditProvider>
        <AuditForm />
      </AuditProvider>
    </A11yWatchProvider>
  );
};

export const DefaultList = ({ children = "Default" }) => {
  return (
    <A11yWatchProvider persist>
      <AuditProvider>
        <AuditForm />
        <AuditList />
      </AuditProvider>
    </A11yWatchProvider>
  );
};

export default {
  title: "AuditForm",
  decorators: [withA11y],
  component: AuditForm,
};
