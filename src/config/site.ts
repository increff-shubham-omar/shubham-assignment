export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Next.js + NextUI",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Module",
      href: "/module",
      imageUrl: "/module-icon.png",
    },
    {
      label: "Purchase order",
      href: "/purchase-order",
      hasChildren: true,
    },
    {
      label: "Invoices",
      href: "/invoices",
    },
    {
      label: "Budgets",
      href: "/budgets",
      hasChildren: true,
    },
  ],
};
