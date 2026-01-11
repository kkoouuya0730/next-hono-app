import Link from "next/link";
import styles from "./Header.module.css";

export const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.navList}>
        <Link href="/" className={styles.title}>
          Next-Hono-app
        </Link>
        <Link href="/posts">投稿一覧</Link>
      </nav>
    </header>
  );
};
