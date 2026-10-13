import type { ComponentPropsWithoutRef } from "react";

type ActionLinkProps = ComponentPropsWithoutRef<"a"> & {
  variant?: "primary" | "secondary" | "text";
  tone?: "default" | "inverse";
};

/** Navigation stays a native link; buttons are reserved for local interactions. */
export default function ActionLink({
  variant = "text",
  tone = "default",
  className = "",
  ...props
}: ActionLinkProps) {
  return <a {...props} data-tone={tone} className={`action action-${variant} ${className}`} />;
}
