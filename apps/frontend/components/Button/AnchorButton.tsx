import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./AnchorButton.module.css";
import Link from "next/link";
import UseIcon, { IconName } from "../icons/UseIcon";

export const ButtonVariantPropertyValues = ["primary", "secondary", "tertiary"] as const;
type ButtonVariant = (typeof ButtonVariantPropertyValues)[number];

export const ButtonSizePropertyValues = ["small", "medium", "large"] as const;
type ButtonSizeProperty = (typeof ButtonSizePropertyValues)[number];
// TODO Button を共通化できるか検討する
interface AnchorButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** ボタンのバリエーション */
  variant?: ButtonVariant;
  /** ボタンのサイズ */
  size?: ButtonSizeProperty;
  /** ローディング状態 */
  loading?: boolean;
  /** アイコン（左側） */
  iconName: IconName;
  /** リンクの遷移先 */
  href: string;
  /** trueの時にaria-current=true */
  isCurrent?: "page" | undefined;
  /** 子要素 */
  children: ReactNode;
}

export const AnchorButton = ({ iconName, href, isCurrent, children }: AnchorButtonProps) => {
  return (
    <Link href={href} className={styles.link} aria-current={isCurrent}>
      <UseIcon variant={isCurrent ? "solid" : "outline"} iconName={iconName} />
      <span className={styles.label}>{children}</span>
    </Link>
  );
};
