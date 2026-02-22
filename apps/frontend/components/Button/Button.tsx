import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";
import clsx from "clsx";

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
  startIcon?: ReactNode;
  /** アイコン（右側） */
  endIcon?: ReactNode;
  /** 子要素 */
  children: ReactNode;
}

export const Button = ({
  variant = "primary",
  size = "medium",
  wide = false,
  loading = false,
  startIcon,
  endIcon,
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
      {!loading && startIcon && (
        <span className={styles.startIcon} aria-hidden="true">
          {startIcon}
        </span>
      )}
      <span className={styles.label}>{children}</span>
      {!loading && endIcon && (
        <span className={styles.endIcon} aria-hidden="true">
          {endIcon}
        </span>
      )}
    </button>
  );
};
