import { useAuditContext } from "../../providers/audit";
import React, { memo, useState } from "react";
import { IssueCell } from "./issue-cell";
import { ListCellHeader } from "./header-collaspsible";

export const IssueListsCollapsibleComponent = ({
  url,
  defaultOpen,
  disableStats,
}: {
  url: string;
  defaultOpen?: boolean;
  disableStats?: boolean;
}) => {
  const { audit } = useAuditContext();
  const [visible, setVisible] = useState<boolean>(!!defaultOpen);
  const page = audit.report instanceof Map && audit.report.get(url);

  // prevent empty pages
  if (!page) {
    return null;
  }

  const { totalIssues, warningCount, errorCount } = page.issuesInfo ?? {
    totalIssues: 0,
    warningCount: 0,
    errorCount: 0,
  };

  return (
    <>
      <ListCellHeader
        url={page.url}
        totalIssues={totalIssues}
        setVisible={setVisible}
        visible={visible}
        warningCount={warningCount}
        errorCount={errorCount}
        domain={page.domain as string}
        disableStats={disableStats}
      />
      <ul
        aria-hidden={!visible}
        className={`${
          visible ? "visible" : "hidden"
        } list-none overflow-x-hidden`}
      >
        {page?.issues?.map((item, index) => (
          <IssueCell
            message={item.message}
            code={item.code}
            context={item.context}
            type={item.type}
            selector={item.selector}
            recurrence={item.recurrence}
            key={item.code + item.selector + index}
          />
        ))}
      </ul>
    </>
  );
};

export const IssueListsCollapsible = memo(IssueListsCollapsibleComponent);
