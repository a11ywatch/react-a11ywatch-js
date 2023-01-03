import React, { memo, useMemo } from "react";

type CellHeaderProps = {
  url?: string;
  setVisible(x: any): void;
  visible?: boolean;
  totalIssues?: number;
  warningCount?: number;
  errorCount?: number;
  domain: string;
  disableStats?: boolean;
};

const ListCellHeaderComponent = ({
  url = "",
  setVisible,
  visible,
  warningCount,
  errorCount,
  disableStats,
}: CellHeaderProps) => {
  const onTogglelist = () => setVisible((v: boolean) => !v);

  const pathName = useMemo(() => {
    let value = url;

    try {
      value = new URL(url).pathname;
    } catch (e) {
      console.error(e);
    }

    return value;
  }, [url]);

  return (
    <div className="flex place-items-center text-xs md:text-sm border-b">
      <button
        className={`${
          disableStats ? "" : "max-w-2/3 "
        }px-4 py-3 text-left place-items-center hover:opacity-80 flex-1 md:w-auto`}
        onClick={onTogglelist}
        aria-expanded={visible}
        aria-label={`Toggle section visible for ${url}`}
      >
        {pathName}
      </button>
      {disableStats ? null : (
        <div className="grid grid grid-cols-2 gap-4 auto-cols-max pr-4">
          <div className="text-right">{warningCount}</div>
          <div className="text-right w-14">{errorCount}</div>
        </div>
      )}
    </div>
  );
};

export const ListCellHeader = memo(ListCellHeaderComponent);
