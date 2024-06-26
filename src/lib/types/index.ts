import type { LucideIcon } from "lucide-react";
import type { ComponentType } from "react";

export type Routes = {
  title: string;
  href: string;
};

export type StoreItem = {
  label: string;
  value: string;
};

export type Option = {
  label: string;
  value: string;
  icon?: ComponentType<{ className?: string }>;
};

export type SidebarItemsType = {
  title: string;
  href: string;
  icon?: LucideIcon | ComponentType<{ className?: string }>;
};
