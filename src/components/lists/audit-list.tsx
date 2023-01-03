import React from "react";
import { useAuditContext } from "../../providers/audit";
import { IssueLists } from "./list";
import { IssueListsCollapsible } from "./list-collapsible";
import { AuditListBar } from "./list-header";

// issue list with audit provider
export const AuditList = ({ disableStats }: { disableStats?: boolean }) => {
  const { audit } = useAuditContext();
  const pageReport = audit.report;

  if (pageReport instanceof Map) {
    return (
      <div className="py-2">
        {disableStats ? null : <AuditListBar />}
        {[...pageReport.keys()].map((item: string) => (
          <IssueListsCollapsible
            url={item}
            key={item}
            disableStats={disableStats}
          />
        ))}
      </div>
    );
  }

  return <IssueLists issues={pageReport?.issues} />;
};
