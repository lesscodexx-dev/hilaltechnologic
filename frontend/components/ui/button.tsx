import React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-md border text-sm font-medium transition focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  primary:
    "border-accent bg-accent text-white hover:bg-indigo-500 focus-visible:ring-2 focus-visible:ring-accent",
  secondary:
    "border-border bg-surface-1 text-text hover:border-accent hover:text-white",
  ghost: "border-transparent bg-transparent text-text hover:bg-surface-2",
};

export function Button({
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(baseStyles, "h-10 px-4", variants[variant], className)}
      {...props}
    />
  );
}
