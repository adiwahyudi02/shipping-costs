import React from "react";
import { Label } from "../Label";
import { ErrorMessage } from "../ErrorMessage";
import styles from "./InputBox.module.sass";
import clsx from "clsx";

interface InputBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: string;
  label?: string;
  disabled?: boolean;
  error?: string;
  isRequired?: boolean;
  suffix?: string | React.ReactNode;
}

export const InputBox = ({
  type,
  label,
  disabled,
  error,
  isRequired = false,
  suffix,
  className,
  ...props
}: InputBoxProps) => {
  const inputClassNames = clsx(
    styles.inputBox__input,
    {
      [styles["inputBox__input--error"]]: !!error,
      [styles["inputBox__input--disabled"]]: disabled,
    },
    className
  );

  return (
    <div className={styles.inputBox}>
      {label && (
        <Label
          label={label}
          htmlFor={label}
          isRequired={isRequired}
          isError={!!error}
        />
      )}
      <div className={styles.inputBox__wrapper}>
        <input
          type={type}
          disabled={disabled}
          className={inputClassNames}
          {...(label && { id: label })}
          {...props}
        />
        {suffix && <span className={styles.inputBox__suffix}>{suffix}</span>}
      </div>
      {error && <ErrorMessage error={error} />}
    </div>
  );
};
