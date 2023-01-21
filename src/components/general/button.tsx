import React, { PropsWithChildren } from "react";
import { clsx } from "clsx";

type ButtonProps = PropsWithChildren<{
  onClick?: any;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  style?: any;
  iconButton?: boolean;
  outline?: boolean; // display outline styles
  title?: string; // button title hover
  round?: boolean; // simple bump to border-radius
}>;

export const outlineStyles = `text-lg font-semibold inline-block rounded hover:bg-[#0E1116] px-10 py-4 bg-white text-black outline hover:text-white hover:no-underline`;

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = "",
  disabled,
  type = "button",
  style,
  iconButton,
  outline,
  round,
  ...extra
}) => {
  return (
    <button
      {...extra}
      style={style}
      type={type}
      disabled={disabled}
      className={clsx(
        "border min-w-[44px] hover:opacity-80",
        iconButton
          ? "border-none text-lg py-3 px-3 rounded-3xl place-content-center place-items-center flex md:text-[1.15rem]"
          : "px-2 py-1 md:px-4",
        outline ? outlineStyles : "",
        className,
        round ? "rounded" : "rounded-2xl"
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
