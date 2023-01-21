import React from "react";
import { clsx } from "clsx";

// accessibility standards to test
export enum Standard {
  "WCAG2A",
  "WCAG2AA",
  "WCAG2AAA",
  "Section508",
}

// todo: remove type and reverse enum map instead
export type AccessibilityStandardKeys = keyof typeof Standard | string;

const standards = Object.values(Standard).filter(
  (value) => typeof value === "string"
);

export interface InputProps {
  onStandardChange(
    event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>
  ): void;
  standard?: AccessibilityStandardKeys;
  spacing?: boolean;
  className?: string;
}

export const WCAGSelectInput = ({
  onStandardChange,
  standard,
  spacing,
  className,
}: InputProps) => {
  return (
    <div>
      <label htmlFor="ext-select-outlined" className="sr-only">
        Accessibility Standard
      </label>
      <select
        id="ext-select-outlined"
        value={standard}
        onChange={onStandardChange}
        className={clsx(
          `text-sm border-0 m-0 hover:opacity-70 rounded py-1.5${
            spacing ? " px-2" : ""
          }`,
          className
        )}
      >
        <optgroup label="Accessibility">
          {standards.map((value: any) => (
            <option value={value} key={value} className={"text-sm"}>
              {value && String(value)?.toUpperCase()}
            </option>
          ))}
        </optgroup>
      </select>
    </div>
  );
};
