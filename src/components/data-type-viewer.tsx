import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils"; // classNames utility (alias or actual import)
import type { FC } from "react";

type Props = {
  type: "string" | "list" | "hash" | "set" | "zset" | string;
  badgeOnly?: boolean;
};

const typeBadgeColors: Record<string, string> = {
  string: "bg-purple-600 text-white dark:bg-purple-500",
  list: "bg-green-600 text-white dark:bg-green-500",
  hash: "bg-blue-600 text-white dark:bg-blue-500",
  set: "bg-yellow-600 text-black dark:bg-yellow-500",
  zset: "bg-pink-600 text-white dark:bg-pink-500",
  default: "bg-red-600 text-white dark:bg-red-500 dark:text-white",
};

const DataTypeViewer: FC<Props> = ({ type, badgeOnly }) => {
  return (
    <div>
      <Badge className={cn(typeBadgeColors[type] || typeBadgeColors.default)}>
        {badgeOnly ? "" : type.toLowerCase()}
      </Badge>
    </div>
  );
};

export default DataTypeViewer;
