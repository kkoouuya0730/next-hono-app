import styles from "./SideMenu.module.css";
import { SIDE_MENU_ITEMS } from "./SideMenu.constants";
import { usePathname } from "next/navigation";
import { Button } from "../Button/Button";
import { AnchorButton } from "../Button/AnchorButton";
import UseIcon from "../icons/UseIcon";

export default function SideMenu() {
  const pathname = usePathname();

  return (
    <header>
      <h1 className={styles.heading}>
        <UseIcon iconName="logo" aria-label="Next Hono App" />
        <span className={styles.headingContent}>Next-Hono-App</span>
      </h1>

      <nav>
        <ul className={styles.menuList}>
          {SIDE_MENU_ITEMS.map(({ href, label, iconName }) => {
            const isCurrent = pathname === href ? "page" : undefined;
            return (
              <li key={label}>
                <AnchorButton iconName={iconName} href={href} isCurrent={isCurrent}>
                  {label}
                </AnchorButton>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className={styles.buttonContainer}>
        <Button wide>Post</Button>
      </div>
    </header>
  );
}
