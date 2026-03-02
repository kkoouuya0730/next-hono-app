import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";
import clsx from "clsx";
import UseIcon, { IconName } from "../icons/UseIcon";

export const ButtonVariantPropertyValues = ["primary", "secondary", "tertiary"] as const;
type ButtonVariant = (typeof ButtonVariantPropertyValues)[number];

export const ButtonSizePropertyValues = ["small", "medium", "large"] as const;
type ButtonSizeProperty = (typeof ButtonSizePropertyValues)[number];
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** ボタンのバリエーション */
  variant?: ButtonVariant;
  /** ボタンのサイズ */
  size?: ButtonSizeProperty;
  /**
   * ボタンのwidth
   * trueの時にwidthを100%にする
   */
  wide?: boolean;
  /** ローディング状態 */
  loading?: boolean;
  /** アイコン（左側） */
  startIconName?: IconName;
  /** アイコン（右側） */
  endIconName?: IconName;
  /** 子要素 */
  children: ReactNode;
}

export const Button = ({
  variant = "primary",
  size = "medium",
  wide = false,
  loading = false,
  startIconName,
  endIconName,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) => {
  const classNames = clsx(
    styles.button,
    styles[variant],
    styles[size],
    loading && styles.loading,
    wide && styles.wide,
    className,
  );

  return (
    <button className={classNames} disabled={disabled || loading} aria-busy={loading} {...props}>
      {loading && <span className={styles.spinner} aria-hidden="true" />}
      {!loading && startIconName && <UseIcon iconName={startIconName} className={styles.startIcon} />}
      <span className={styles.label}>{children}</span>
      {!loading && endIconName && <UseIcon iconName={endIconName} className={styles.startIcon} />}
    </button>
  );
};
