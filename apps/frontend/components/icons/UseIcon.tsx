import clsx from "clsx";
import { BellIcon, HomeIcon, LogoIcon, MailIcon, SearchIcon, UserIcon, UserPlusIcon } from ".";
import { IconProps } from "./icon.types";
import styles from "./Icon.module.css";
import { EllipsisHorizontalIcon } from "./EllipsisHorizontalIcon";

const ICONNAME_MAPPING = {
  home: HomeIcon,
  bell: BellIcon,
  user: UserIcon,
  userPlus: UserPlusIcon,
  search: SearchIcon,
  mail: MailIcon,
  logo: LogoIcon,
  ellipsisHorizontal: EllipsisHorizontalIcon,
};

export const iconNameValue = Object.keys(ICONNAME_MAPPING) as Array<keyof typeof ICONNAME_MAPPING>;

export type IconName = (typeof iconNameValue)[number];

type Props = {
  iconName: IconName;
  className?: string;
} & IconProps;
export default function UseIcon({ iconName, variant, className, ...props }: Props) {
  const SelectedIcon = ICONNAME_MAPPING[iconName];

  if (!SelectedIcon) return null;

  return <SelectedIcon className={clsx([className, styles.icon])} variant={variant} {...props} />;
}
