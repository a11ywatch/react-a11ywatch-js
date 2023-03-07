import React from "react";
import { useAuditContext } from "../../providers/audit";
import { IssueLists } from "./list";
import { IssueListsCollapsible } from "./list-collapsible";
import { AuditListBar } from "./list-header";
import { LoadingIndicator } from "../pure/loading-indicator";

// issue list with audit provider
export const AuditList = ({
  disableStats,
  loaderClassName,
}: {
  disableStats?: boolean;
  loaderClassName?: string;
}) => {
  const { audit } = useAuditContext();
  const pageReport = audit.report;

  if (pageReport instanceof Map) {
    return (
      <div>
        {disableStats ? null : <AuditListBar pageCount={pageReport.size} />}
        {pageReport.size === 0 ? (
          <LoadingIndicator
            loading={audit.loading}
            loaderClassName={loaderClassName}
          />
        ) : null}
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

  const issues = pageReport?.issues || [];

  return (
    <>
      {!issues.length ? (
        <LoadingIndicator
          loading={audit.loading}
          loaderClassName={loaderClassName}
        />
      ) : null}
      <IssueLists issues={issues} />
    </>
  );
};
