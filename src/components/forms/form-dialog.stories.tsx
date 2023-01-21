import React from "react";
import { withA11y } from "@storybook/addon-a11y";
import { FormDialog } from "./form-dialog";
import { A11yWatchProvider } from "../../providers/app";
import { AuditProvider } from "../../providers/audit";
import { AuditList } from "../lists/audit-list";

export const Default = () => {
  return (
    <A11yWatchProvider persist>
      <AuditProvider multi>
        <FormDialog />
      </AuditProvider>
    </A11yWatchProvider>
  );
};

// persist the audit
const Component = ({
  persist,
  multi,
  disableStats,
}: {
  persist?: boolean;
  multi?: boolean;
  disableStats?: boolean;
}) => {
  return (
    <A11yWatchProvider>
      <AuditProvider multi={multi}>
        <FormDialog />
        <AuditList disableStats={disableStats} />
      </AuditProvider>
    </A11yWatchProvider>
  );
};

export const List = () => {
  return <Component />;
};

export default {
  title: "FormDialog",
  decorators: [withA11y],
  component: FormDialog,
};
