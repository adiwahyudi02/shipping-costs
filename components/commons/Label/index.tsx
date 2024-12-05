import React from "react";
import clsx from "clsx";
import styles from "./Label.module.sass";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  label: string;
  isError?: boolean;
  isRequired?: boolean;
}

export const Label = ({
  label,
  isError = false,
  isRequired = false,
  className,
  ...props
}: LabelProps) => {
  const labelClassNames = clsx(
    styles.label,
    {
      [styles["label--error"]]: isError,
    },
    className
  );

  return (
    label && (
      <label className={labelClassNames} {...props}>
        {label}
        {isRequired && <span className={styles.label__required}>*</span>}
      </label>
    )
  );
};
