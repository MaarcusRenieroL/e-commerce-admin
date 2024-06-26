import { Routes, SidebarItemsType } from "./types";
import { Icons } from "~/components/icons";

export const ROUTES: Routes[] = [
  {
    title: "Overview",
    href: "/",
  },
  {
    title: "Billboards",
    href: "/billboards",
  },
  {
    title: "Categories",
    href: "/categories",
  },
  {
    title: "Sizes",
    href: "/sizes",
  },
  {
    title: "Colors",
    href: "/colors",
  },
  {
    title: "Products",
    href: "/products",
  },
  {
    title: "Orders",
    href: "/orders",
  },
  {
    title: "Settings",
    href: "/settings",
  },
];

export const LANDING_PAGE_NAVBAR_ROUTES: Routes[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
  },
  {
    title: "About",
    href: "#about",
  },
  {
    title: "Features",
    href: "#features",
  },
  {
    title: "Testimonials",
    href: "#testimonials",
  },
  {
    title: "Get Started",
    href: "#get-started",
  },
];

export const SIDEBAR_ITEMS: SidebarItemsType[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Icons.dashboard,
  },
  {
    title: "About",
    href: "#about",
    icon: Icons.about,
  },
  {
    title: "Features",
    href: "#features",
    icon: Icons.features,
  },
  {
    title: "Testimonials",
    href: "#testimonials",
    icon: Icons.teams,
  },
  {
    title: "Get Started",
    href: "#get-started",
    icon: Icons.getStarted,
  },
];

export const DASHBOARD_SIDEBAR_ITEMS: SidebarItemsType[] = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: Icons.dashboard,
  },
  {
    title: "Billboards",
    href: "/billboards",
    icon: Icons.billboards,
  },
  {
    title: "Categories",
    href: "/categories",
    icon: Icons.categories,
  },
  {
    title: "Sizes",
    href: "/sizes",
    icon: Icons.sizes,
  },
  {
    title: "Colors",
    href: "/colors",
    icon: Icons.colors,
  },
  {
    title: "Products",
    href: "/products",
    icon: Icons.product,
  },
  {
    title: "Orders",
    href: "/orders",
    icon: Icons.cart,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Icons.settings,
  },
];
