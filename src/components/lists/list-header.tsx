import React from "react";

export const AuditListBar = ({ pageCount }: { pageCount?: number }) => {
  return (
    <div className="flex px-4 py-2 flex-1 w-full place-items-center border-t border-b border-dotted text-xs md:text-sm">
      <div className="text-left">Pages ({pageCount || 0})</div>
      <div className="flex flex-1 w-full place-content-end text-right">
        <div className="grid grid grid-cols-2 gap-4">
          <div>Warnings</div>
          <div>Errors</div>
        </div>
      </div>
    </div>
  );
};
