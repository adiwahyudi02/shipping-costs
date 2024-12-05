import { useMemo } from "react";
import clsx from "clsx";
import styles from "./Button.module.sass";
import { Loader } from "../Loader";

type ButtonVariant = "primary" | "secondary" | "danger" | "warning";
type ButtonSize = "sm" | "md" | "lg" | "xl";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button = ({
  variant = "primary",
  size = "md",
  children,
  disabled = false,
  isLoading = false,
  className,
  ...props
}: ButtonProps) => {
  const buttonClass = useMemo(
    () =>
      clsx(
        styles.button,
        styles[`button--${variant}`],
        styles[`button--${size}`],
        { [styles["button--disabled"]]: disabled || isLoading },
        className
      ),
    [variant, size, disabled, isLoading, className]
  );

  return (
    <button className={buttonClass} disabled={disabled || isLoading} {...props}>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Loader variant="primary" size="sm" />
        </div>
      ) : (
        children
      )}
    </button>
  );
};
