import { ButtonHTMLAttributes, MouseEventHandler } from "react";
import styles from "./IconButton.module.css";
import clsx from "clsx";
import UseIcon, { IconName } from "../icons/UseIcon";

export const ButtonSizePropertyValues = ["small", "medium", "large"] as const;
type ButtonSizeProperty = (typeof ButtonSizePropertyValues)[number];
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** ボタンのサイズ */
  size?: ButtonSizeProperty;
  /** ローディング状態 */
  loading?: boolean;
  /** アイコン */
  iconName: IconName;
  /**
   * アクセシブルネーム
   * アイコンだけだと視覚的ラベルが存在しないので、aria-labelを必須にする
   */
  ariaLabel: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const IconButton = ({
  size = "medium",
  loading = false,
  iconName,
  disabled,
  className,
  ariaLabel,
  title,
  ...props
}: ButtonProps) => {
  const classNames = clsx(styles.button, styles[size], loading && styles.loading, className);

  return (
    <button className={classNames} disabled={disabled || loading} aria-busy={loading} {...props}>
      {loading && <span className={styles.spinner} aria-hidden="true" />}
      {!loading && <UseIcon iconName={iconName} className={styles.icon} aria-label={ariaLabel} title={title} />}
    </button>
  );
};
