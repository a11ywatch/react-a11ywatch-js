import React, { memo } from "react";
import { PageIssue } from "../../types";

export const getErrorColor = (name: string) => {
  if (name === "error") {
    return "bg-red-500";
  }
  if (name === "warning") {
    return "bg-yellow-500";
  }
  return "bg-gray-500";
};

export const codeFormatter = (code?: string) => {
  const codeDisplay = code?.replace(/_+/g, "");

  const hrefCode = `https://www.w3.org/TR/WCAG20-TECHS/${codeDisplay
    ?.replace(".Fail", "")
    ?.replace(".Alpha", "")
    ?.replace(".BgColour", "")
    ?.replace(".BgImage", "")
    ?.replace(".Abs", "")
    ?.replace(".NoContent", "")
    ?.replace(".Button.Name", "")
    ?.replace(".A.Empty", "")
    ?.substring(codeDisplay?.lastIndexOf(".") + 1)}`.split(",");

  const codeHref = hrefCode?.length ? hrefCode[hrefCode.length - 1] : "";

  return {
    codeDisplay,
    codeHref,
  };
};

// Display issue UI without events
export function IssueCellComponent({
  message,
  code,
  context,
  type: issueType = "notice",
  selector,
  recurrence,
}: Omit<PageIssue, "runner" | "typeCode">) {
  const { codeHref, codeDisplay } = codeFormatter(code);
  const [m, rec] = message?.split("Recommendation:") || [message, ""];
  const largeBody = m && m?.length < 80;

  return (
    <div className="px-3 py-3 flex gap-y-0.5 flex-col place-content-between h-[inherit]">
      <div>
        <div className="flex space-x-2 items-center">
          <div
            className={`${getErrorColor(
              issueType + ""
            )} min-w-[0.75rem] min-h-[0.75rem] w-3 h-3 rounded-full`}
          />
          <p
            className={`truncate text-sm font-medium max-w-[90%] flex-1 ${
              largeBody ? "xl:text-base" : ""
            }`}
          >
            {selector}
          </p>
          <div className="justify-end flex flex-shrink">
            {recurrence ? (
              <div className="px-2 bg-gray-200 rounded">
                <p className={"truncate text-xs font-semibold"}>
                  Recurrence: {recurrence}
                </p>
              </div>
            ) : null}
          </div>
        </div>
        <div className="truncate max-w-[88vw] overflow-hidden">
          <a
            href={codeHref}
            title={`view technique for ${codeDisplay}`}
            target="_blank"
            rel="noreferrer"
            className="text-gray-600 dark:text-blue-700 text-xs hover:underline p-0 m-0"
          >
            {codeDisplay}
          </a>
        </div>
      </div>
      <div
        className={`line-clamp-5 md:line-clamp-4 text-sm ${
          largeBody ? "xl:text-base" : "leading-snug"
        }`}
      >
        {m}
        {rec ? (
          <>
            {` Recommendation:`}
            <div className="text-blue-600 font-medium inline">{rec}</div>
          </>
        ) : null}
      </div>
      {context ? (
        <code className={"text-xs max-w-[100vw] line-clamp-3"}>{context}</code>
      ) : null}
    </div>
  );
}

export const IssueCell = memo(IssueCellComponent);
