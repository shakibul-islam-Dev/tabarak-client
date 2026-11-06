import type { StaticImageData } from "next/image";

export type ProductImage = {
  src: string;
  alt: string;
};

export type ColorOption = {
  name: string;
  hex: string;
};

export type ProductBadge = "New" | "Bestseller" | "Limited" | "Sale";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: CategorySlug;
  collections: string[];
  price: number;
  compareAtPrice?: number;
  description: string;
  details: string[];
  material: string;
  care: string;
  images: ProductImage[];
  colors: ColorOption[];
  sizes: string[];
  badge?: ProductBadge;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stock: number;
  featured: boolean;
  createdAt: string;
};

export type CategorySlug =
  | "apparel"
  | "footwear"
  | "bags"
  | "jewelry"
  | "home"
  | "accessories";

export type Category = {
  slug: CategorySlug;
  name: string;
  description: string;
};

export type Collection = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  accent: string;
};

export type CartItem = {
  key: string;
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  color: string;
  size: string;
  quantity: number;
  maxQuantity: number;
};

export type SortOption =
  | "featured"
  | "newest"
  | "price-asc"
  | "price-desc"
  | "name-asc";

export type ImageSource = string | StaticImageData;
