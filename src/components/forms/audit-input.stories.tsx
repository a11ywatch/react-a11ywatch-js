import React from "react";
import { withA11y } from "@storybook/addon-a11y";
import { AuditForm } from "./audit-input";
import { A11yWatchProvider } from "../../providers/app";
import { AuditProvider } from "../../providers/audit";
import { AuditList } from "../lists/audit-list";

// just the form without the list
export const Default = () => {
  return (
    <A11yWatchProvider persist>
      <AuditProvider>
        <AuditForm />
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
    <A11yWatchProvider persist>
      <AuditProvider persist={persist} multi={multi}>
        <AuditForm />
        <AuditList disableStats={disableStats} />
      </AuditProvider>
    </A11yWatchProvider>
  );
};

export const DefaultList = () => {
  return <Component />;
};

export const DefaultListPersist = () => {
  return <Component persist />;
};

export const DefaultMultiPersistList = () => {
  return <Component multi persist />;
};

export const DefaultMultiPersistListNoStats = () => {
  return <Component multi persist disableStats />;
};

export const DefaultListPersistCustomKeys = () => {
  return (
    <A11yWatchProvider persist>
      <div className="space-y-4">
        <AuditProvider persist={"website-1"}>
          <AuditForm />
          <div className="max-h-96 overflow-y-auto">
            <AuditList />
          </div>
        </AuditProvider>
        <AuditProvider persist={"website-2"}>
          <AuditForm />
          <div className="max-h-96 overflow-y-auto">
            <AuditList />
          </div>
        </AuditProvider>
      </div>
    </A11yWatchProvider>
  );
};

export default {
  title: "AuditForm",
  decorators: [withA11y],
  component: AuditForm,
};
