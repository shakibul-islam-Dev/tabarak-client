export const mainNav = [
  { name: "Shop", href: "/shop" },
  { name: "Collections", href: "/collections" },
  { name: "Our Story", href: "/about" },
  { name: "Contact", href: "/contact" },
] as const;

export const footerNav = {
  shop: [
    { name: "All pieces", href: "/shop" },
    { name: "Apparel", href: "/shop?category=apparel" },
    { name: "Footwear", href: "/shop?category=footwear" },
    { name: "Bags", href: "/shop?category=bags" },
    { name: "Home", href: "/shop?category=home" },
  ],
  company: [
    { name: "Our story", href: "/about" },
    { name: "Collections", href: "/collections" },
    { name: "Journal", href: "/about#journal" },
    { name: "Contact", href: "/contact" },
  ],
  support: [
    { name: "Shipping & returns", href: "/contact#shipping" },
    { name: "Size guide", href: "/contact#sizes" },
    { name: "Care guide", href: "/contact#care" },
    { name: "FAQ", href: "/contact#faq" },
    { name: "Track your order", href: "/contact#track" },
  ],
} as const;

export const socialLinks = [
  { name: "Instagram", href: "https://instagram.com" },
  { name: "Pinterest", href: "https://pinterest.com" },
  { name: "Facebook", href: "https://facebook.com" },
] as const;
