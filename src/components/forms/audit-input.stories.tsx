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

export const DefaultListPersist = ({ children = "Default" }) => {
  return (
    <A11yWatchProvider persist>
      <AuditProvider persist>
        <AuditForm />
        <AuditList />
      </AuditProvider>
    </A11yWatchProvider>
  );
};

export const DefaultListPersistCustomKeys = ({ children = "Default" }) => {
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
