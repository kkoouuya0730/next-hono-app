import * as React from "react";

type BaseIconProps = React.SVGProps<SVGSVGElement> & {
  title?: string;
};

export const BaseIcon = React.forwardRef<SVGSVGElement, BaseIconProps>(function BaseIcon(
  { title, "aria-label": ariaLabel, children, ...props },
  ref,
) {
  const isDecorative = !ariaLabel && !title;

  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
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
