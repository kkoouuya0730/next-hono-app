import * as React from "react";
import { IconProps } from "./icon.types";

type BaseIconProps = IconProps;

export const BaseIcon = React.forwardRef<SVGSVGElement, BaseIconProps>(function BaseIcon(
  { title, variant = "outline", "aria-label": ariaLabel, children, ...props },
  ref,
) {
  const isDecorative = !ariaLabel && !title;
  const isSolid = variant === "solid";

  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={isSolid ? "currentColor" : "none"}
      stroke={isSolid ? "none" : "currentColor"}
      strokeWidth={isSolid ? undefined : 1.5}
      role={isDecorative ? undefined : "img"}
      aria-hidden={isDecorative ? true : undefined}
      aria-label={ariaLabel}
      {...props}
    >
      {title && <title>{title}</title>}
      {children}
    </svg>
  );
});
