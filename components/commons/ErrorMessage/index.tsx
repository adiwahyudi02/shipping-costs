import React from "react";
import styles from "./ErrorMessage.module.sass";

interface ErrorMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {
  error?: string;
}

export const ErrorMessage = ({
  error,
  className,
  ...props
}: ErrorMessageProps) => {
  return (
    error && (
      <p className={`${styles.errorMessage} ${className}`} {...props}>
        {error}
      </p>
    )
  );
};
