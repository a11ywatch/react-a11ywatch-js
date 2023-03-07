import React, {
  forwardRef,
  DetailedHTMLProps,
  InputHTMLAttributes,
  ForwardedRef,
} from "react";
import { clsx } from "clsx";

interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  underline?: boolean; // underline styles
}

export const TextField = forwardRef(function TextField(
  { className, underline, ...props }: InputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <input
      className={clsx(
        underline
          ? "flex-1 px-2 border-b focus:outline-none focus:border-blue-700"
          : "px-4 py-3 border-2 rounded focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 invalid:border-gray-700",
        className || ""
      )}
      ref={ref}
      {...props}
    ></input>
  );
});
