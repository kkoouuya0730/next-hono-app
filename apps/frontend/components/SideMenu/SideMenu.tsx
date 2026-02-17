import Link from "next/link";
import styles from "./SideMenu.module.css";
import { SIDE_MENU_ITEMS } from "./SideMenu.constants";
import { LogoIcon } from "../icons";
import { usePathname } from "next/navigation";

export default function SideMenu() {
  const pathname = usePathname();

  return (
    <header>
      <h1>
        <LogoIcon className={styles.menuIcon} aria-label="X" />
      </h1>

      <nav>
        <ul>
          {SIDE_MENU_ITEMS.map(({ href, label, Icon }) => {
            const isCurrent = pathname === href ? "page" : undefined;
            return (
              <li key={label}>
                <Link href={href} className={styles.menuLink} aria-current={isCurrent}>
                  <Icon className={styles.menuIcon} variant={isCurrent ? "solid" : "outline"} aria-hidden="true" />
                  <span className={styles.menuLabel}>{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <button>Post</button>
      <div>xxx</div>
    </header>
  );
}
