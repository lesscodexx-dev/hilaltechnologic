import React from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-10 w-full rounded-md border border-border bg-surface-1 px-3 text-sm text-text placeholder:text-text-muted focus-visible:ring-2 focus-visible:ring-accent",
        className
      )}
      {...props}
    />
  );
}
