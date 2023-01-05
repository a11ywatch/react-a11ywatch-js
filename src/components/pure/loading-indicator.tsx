import React, { FC, PropsWithChildren } from "react";

// loading indicator
export const LoadingIndicator: FC<
  PropsWithChildren<{
    loaderClassName?: string;
    loading?: boolean;
    hideText?: boolean;
  }>
> = ({ loading, loaderClassName, children, hideText, ...rest }) => {
  return (
    <div
      className={`${loaderClassName ? loaderClassName : "px-2 py-2"} ${
        loading ? "block" : "hidden"
      }`}
      aria-hidden={!loading}
      {...rest}
    >
      {hideText ? null : children || "Loading..."}
    </div>
  );
};
