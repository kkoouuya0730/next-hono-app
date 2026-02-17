export type IconVariant = "outline" | "solid";

export type IconProps = React.SVGProps<SVGSVGElement> & {
  title?: string;
  variant?: IconVariant;
};
