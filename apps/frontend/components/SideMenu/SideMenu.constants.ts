import { BellIcon, HomeIcon, MailIcon, SearchIcon, UserIcon, UserPlusIcon } from "../icons";

export const SIDE_MENU_ITEMS = [
  {
    href: "/",
    label: "Home",
    Icon: HomeIcon,
  },
  {
    href: "/explore",
    label: "Explore",
    Icon: SearchIcon,
  },
  {
    href: "/notifications",
    label: "Notification",
    Icon: BellIcon,
  },
  {
    href: "/follow",
    label: "Follow",
    Icon: UserPlusIcon,
  },
  {
    href: "/chat",
    label: "Chat",
    Icon: MailIcon,
  },
  {
    href: "/profile",
    label: "Profile",
    Icon: UserIcon,
  },
] as const;
