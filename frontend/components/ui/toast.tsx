import React from "react";
import { cn } from "@/lib/utils";

export function Toast({
  title,
  description,
  className,
}: {
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-md border border-border bg-surface-2 px-4 py-3 text-sm text-text",
        className
      )}
    >
      <div className="font-semibold">{title}</div>
      {description ? <div className="text-text-muted">{description}</div> : null}
    </div>
  );
}
