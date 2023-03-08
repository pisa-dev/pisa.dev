import React, { AnchorHTMLAttributes, ForwardedRef } from "react";
import classNames from "classnames";
import { defaultButtonClasses } from "./Button";

const _AnchorButton = (
  { className, children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>,
  ref: ForwardedRef<HTMLAnchorElement>
) => (
  <a
    ref={ref}
    {...props}
    className={classNames(defaultButtonClasses, className)}
  >
    {children}
  </a>
);

export const AnchorButton =
  React.forwardRef<HTMLAnchorElement, AnchorHTMLAttributes<HTMLAnchorElement>>(_AnchorButton);