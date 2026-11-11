import type { ComponentProps } from "react";
import styles from "./SectionLabel.module.css";

type SectionLabelProps = ComponentProps<"p"> & {
  tone?: "default" | "inverse";
};

export default function SectionLabel({
  children,
  className = "",
  tone = "default",
  ...props
}: SectionLabelProps) {
  return (
    <p {...props} className={`${styles.label} ${className}`} data-tone={tone}>
      <span className={styles.text}>{children}</span>
    </p>
  );
}
