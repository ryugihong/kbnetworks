export type NavLink = {
  label: string;
  href: string;
};

export const NAV_LINKS: NavLink[] = [
  { label: "About", href: "/about" },
  { label: "Brands", href: "/brands" },
  { label: "Market", href: "/market" },
  { label: "Process", href: "/process" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_LINKS: NavLink[] = [
  ...NAV_LINKS,
  { label: "FAQ", href: "/faq" },
];

export const SOCIAL_LINKS: { label: string; href: string }[] = [
  { label: "Instagram — 삼용푸드", href: "https://www.instagram.com/samyong_food" },
  { label: "Instagram — YUN'S BUFFET", href: "https://www.instagram.com/yunsbuffet" },
  { label: "TikTok", href: "https://www.tiktok.com/@samyong_food" },
];
