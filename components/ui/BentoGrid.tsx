"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

interface BentoItemProps {
  children: React.ReactNode;
  className?: string;
  /** colspan on the 4-col grid: 1 | 2 | 3 | 4 */
  col?: 1 | 2 | 3 | 4;
  /** rowspan */
  row?: 1 | 2;
}

const colMap = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
};
const rowMap = {
  1: "row-span-1",
  2: "row-span-2",
};

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[minmax(160px,auto)]",
        className
      )}
    >
      {children}
    </div>
  );
}

export function BentoItem({
  children,
  className,
  col = 1,
  row = 1,
}: BentoItemProps) {
  return (
    <div
      className={cn(
        "lg:" + colMap[col],
        "lg:" + rowMap[row],
        className
      )}
    >
      {children}
    </div>
  );
}
