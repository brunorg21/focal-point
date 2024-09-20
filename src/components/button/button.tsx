import { ComponentProps, ReactNode } from "react";
import styles from "./button.module.scss";

interface ButtonProps extends ComponentProps<"button"> {
  children: ReactNode;
  variant?: "default" | "cancel" | "delete";
}

export function Button({
  children,
  variant = "default",
  ...props
}: ButtonProps) {
  return (
    <button
      className={
        variant === "default"
          ? styles.defaultButton
          : variant === "cancel"
          ? styles.cancelButton
          : styles.deleteButton
      }
      {...props}
    >
      {children}
    </button>
  );
}
