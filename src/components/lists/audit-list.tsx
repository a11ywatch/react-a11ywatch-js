import React from "react";
import { useAuditContext } from "../../providers/audit";
import { IssueLists } from "./list";

// issue list with audit provider
export const AuditList = () => {
  const { audit } = useAuditContext();

  return <IssueLists issues={audit.report?.issues} />;
};
