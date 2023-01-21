import React, {
  DetailedHTMLProps,
  FC,
  LabelHTMLAttributes,
  PropsWithChildren,
} from "react";
import { clsx } from "clsx";

interface LabelProps
  extends DetailedHTMLProps<
    LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  > {
  visible?: boolean;
  disabled?: boolean; // is the input disabled
  id?: string;
}

export const FormControl: FC<PropsWithChildren<LabelProps>> = ({
  disabled,
  htmlFor,
  visible,
  id,
  children,
  className,
}) => {
  return (
    <label
      className={clsx(
        `${visible ? "text-sm" : "sr-only"}`,
        disabled ? "text-gray-500" : "",
        className
      )}
      htmlFor={htmlFor}
      id={id}
    >
      {children}
    </label>
  );
};
