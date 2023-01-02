import React from "react";
import { PageIssue } from "../../types";
import { IssueCell } from "./issue-cell";

export const IssueLists = ({ issues }: { issues?: PageIssue[] }) => {
  return (
    <ul className="list-none overflow-x-hidden">
      {issues?.map((item, index) => (
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
  );
};
