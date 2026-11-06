import type { Category, Collection, Product } from "@/types";

const photo = (id: string, width = 1400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=80`;

export const categories: Category[] = [
  {
    slug: "apparel",
    name: "Apparel",
    description: "Quiet tailoring and everyday layers in natural fibres.",
  },
  {
    slug: "footwear",
    name: "Footwear",
    description: "Low-key silhouettes built for long days on your feet.",
  },
  {
    slug: "bags",
    name: "Bags",
    description: "Carry-alls in full-grain leather, made to age beautifully.",
  },
  {
    slug: "jewelry",
    name: "Jewelry",
    description: "Solid gold and recycled silver, designed to be layered.",
  },
  {
    slug: "home",
    name: "Home",
    description: "Objects for slower mornings and quieter evenings.",
  },
  {
    slug: "accessories",
    name: "Accessories",
    description: "The finishing details — kept few, kept good.",
  },
];

export const collections: Collection[] = [
  {
    slug: "the-quiet-edit",
    name: "The Quiet Edit",
    tagline: "Autumn / Winter 2026",
    description:
      "A restrained wardrobe of softened tailoring, brushed cotton and deep, earthy tones. Pieces that ask very little of you and give back for years.",
    image: photo("1445205170230-053b83016050"),
    accent: "olive",
  },
  {
    slug: "weekend-uniform",
    name: "Weekend Uniform",
    tagline: "Off-duty essentials",
    description:
      "Easy layers, broken-in leather and sneakers that go the distance. Built around the two days that are actually yours.",
    image: photo("1515886657613-9f3515b0c78f"),
    accent: "sand",
  },
  {
    slug: "objects-for-living",
    name: "Objects for Living",
    tagline: "For the home",
    description:
      "Hand-thrown stoneware, linen textiles and warm amber light. Small, considered objects that make a room feel settled.",
    image: photo("1616486338812-3dadae4b4ace"),
    accent: "clay",
  },
  {
    slug: "the-gifting-edit",
    name: "The Gifting Edit",
    tagline: "Wrapped and ready",
    description:
      "A short list of things worth giving — jewelry, leather and quiet objects, wrapped in recycled paper with a handwritten note.",
    image: photo("1487222477894-8943e31ef7b2"),
    accent: "ink",
  },
];

const apparelSizes = ["XS", "S", "M", "L", "XL"];
const shoeSizes = ["39", "40", "41", "42", "43", "44", "45"];
const oneSize = ["One size"];

export const products: Product[] = [
  {
    id: "p-001",
    slug: "essential-oxford-shirt",
    name: "Essential Oxford Shirt",
    category: "apparel",
    collections: ["the-quiet-edit"],
    price: 4200,
    compareAtPrice: 5400,
    description:
      "Our interpretation of the shirt you reach for without thinking. Cut from a substantial organic cotton oxford with a soft, broken-in hand, a relaxed body and a collar that sits just right — open or buttoned.",
    details: [
      "Relaxed fit with a gently dropped shoulder",
      "Mother-of-pearl buttons",
      "Curved hem, wearable tucked or loose",
      "Model is 183cm and wears a size M",
    ],
    material: "100% organic cotton oxford, 140 gsm",
    care: "Cold machine wash. Line dry. Warm iron if needed.",
    images: [
      { src: photo("1521572163474-6864f9cf17ab"), alt: "Essential Oxford Shirt in natural white" },
      { src: photo("1523381210434-271e8be1f52b"), alt: "Oxford shirt detail on a clothing rail" },
    ],
    colors: [
      { name: "Chalk", hex: "#F2EFE8" },
      { name: "Fog", hex: "#B8B8B0" },
      { name: "Olive", hex: "#5A6350" },
    ],
    sizes: apparelSizes,
    badge: "Bestseller",
    rating: 4.8,
    reviewCount: 126,
    inStock: true,
    stock: 18,
    featured: true,
    createdAt: "2026-08-14",
  },
  {
    id: "p-002",
    slug: "wool-blend-overcoat",
    name: "Wool-Blend Overcoat",
    category: "apparel",
    collections: ["the-quiet-edit", "the-gifting-edit"],
    price: 12800,
    description:
      "An oversized, double-faced overcoat in a soft wool blend. Unlined for lightness, with a generous lapel and deep patch pockets. The kind of coat that becomes the silhouette of your winter.",
    details: [
      "Oversized, unlined silhouette",
      "Double-faced wool blend",
      "Two deep patch pockets",
      "Horn-look buttons",
    ],
    material: "68% wool, 22% recycled polyester, 10% polyamide",
    care: "Dry clean only. Brush gently between wears.",
    images: [
      { src: photo("1539109136881-3be0616acf4b"), alt: "Wool-blend overcoat in camel" },
      { src: photo("1434389677669-e08b4cac3105"), alt: "Overcoat styled over dark tailoring" },
    ],
    colors: [
      { name: "Camel", hex: "#B49A79" },
      { name: "Charcoal", hex: "#3A3A38" },
    ],
    sizes: apparelSizes,
    badge: "Limited",
    rating: 4.9,
    reviewCount: 42,
    inStock: true,
    stock: 7,
    featured: true,
    createdAt: "2026-09-02",
  },
  {
    id: "p-003",
    slug: "relaxed-cotton-tee",
    name: "Relaxed Cotton Tee",
    category: "apparel",
    collections: ["weekend-uniform"],
    price: 1850,
    description:
      "A heavyweight cotton tee with a boxy, slightly cropped body and a ribbed neckline that holds its shape. Garment-dyed in small batches for a lived-in colour from the first wear.",
    details: [
      "Boxy, slightly cropped fit",
      "Heavyweight 240 gsm jersey",
      "Garment-dyed in small batches",
      "Pre-shrunk",
    ],
    material: "100% combed organic cotton, 240 gsm",
    care: "Machine wash cold with like colours. Tumble dry low.",
    images: [
      { src: photo("1521572163474-6864f9cf17ab"), alt: "Relaxed cotton tee in off-white" },
      { src: photo("1483985988355-763728e1935b"), alt: "Everyday cotton essentials" },
    ],
    colors: [
      { name: "Bone", hex: "#E8E2D5" },
      { name: "Ink", hex: "#252524" },
      { name: "Clay", hex: "#A4705B" },
    ],
    sizes: apparelSizes,
    badge: "New",
    rating: 4.7,
    reviewCount: 214,
    inStock: true,
    stock: 46,
    featured: true,
    createdAt: "2026-10-18",
  },
  {
    id: "p-004",
    slug: "structured-leather-jacket",
    name: "Structured Leather Jacket",
    category: "apparel",
    collections: ["the-quiet-edit", "weekend-uniform"],
    price: 15500,
    description:
      "A clean-lined take on the leather jacket, with a softly structured shoulder and a collar that stands on its own. Cut from vegetable-tanned lambskin that softens with every wear.",
    details: [
      "Slightly cropped, structured fit",
      "Vegetable-tanned lambskin",
      "Cupro lining",
      "Two-way metal zip",
    ],
    material: "100% vegetable-tanned lambskin; cupro lining",
    care: "Wipe with a soft dry cloth. Professional leather clean only.",
    images: [
      { src: photo("1551028719-00167b16eac5"), alt: "Structured leather jacket in black" },
      { src: photo("1591047139829-d91aecb6caea"), alt: "Leather jacket detail" },
    ],
    colors: [
      { name: "Black", hex: "#1D1C1A" },
      { name: "Espresso", hex: "#4C3A2E" },
    ],
    sizes: apparelSizes,
    rating: 4.8,
    reviewCount: 31,
    inStock: true,
    stock: 5,
    featured: false,
    createdAt: "2026-07-22",
  },
  {
    id: "p-005",
    slug: "everyday-leather-sneaker",
    name: "Everyday Leather Sneaker",
    category: "footwear",
    collections: ["weekend-uniform"],
    price: 6900,
    description:
      "A pared-back low-top in soft Italian leather with a slim cupsole. No logos, no noise — just a clean profile that works with everything in your wardrobe.",
    details: [
      "Full-grain leather upper",
      "Margom-style rubber cupsole",
      "Cushioned recycled-foam footbed",
      "Fits true to size",
    ],
    material: "Full-grain leather upper, natural rubber sole",
    care: "Wipe clean with a damp cloth. Condition leather monthly.",
    images: [
      { src: photo("1549298916-b41d501d3772"), alt: "Everyday leather sneaker in white" },
      { src: photo("1525966222134-fcfa99b8ae77"), alt: "Leather sneaker side profile" },
    ],
    colors: [
      { name: "Optic White", hex: "#F4F2ED" },
      { name: "Sand", hex: "#C9B79C" },
    ],
    sizes: shoeSizes,
    badge: "Bestseller",
    rating: 4.9,
    reviewCount: 188,
    inStock: true,
    stock: 24,
    featured: true,
    createdAt: "2026-06-11",
  },
  {
    id: "p-006",
    slug: "court-low-sneaker",
    name: "Court Low Sneaker",
    category: "footwear",
    collections: ["weekend-uniform"],
    price: 7400,
    description:
      "A low court silhouette with a slightly vintage sole and a suede heel tab. Broken-in from day one, with just enough retro to feel personal.",
    details: [
      "Leather and suede upper",
      "Vintage-effect rubber sole",
      "Cotton laces",
      "Unisex sizing",
    ],
    material: "Leather and suede upper, rubber sole",
    care: "Brush suede panels. Spot clean leather with a damp cloth.",
    images: [
      { src: photo("1525966222134-fcfa99b8ae77"), alt: "Court low sneaker in white" },
      { src: photo("1600185365483-26d7a4cc7519"), alt: "Court sneaker on foot" },
    ],
    colors: [
      { name: "White / Grey", hex: "#DFDCD4" },
      { name: "Off-Black", hex: "#2B2A28" },
    ],
    sizes: shoeSizes,
    rating: 4.6,
    reviewCount: 74,
    inStock: true,
    stock: 12,
    featured: false,
    createdAt: "2026-05-30",
  },
  {
    id: "p-007",
    slug: "runner-knit-sneaker",
    name: "Runner Knit Sneaker",
    category: "footwear",
    collections: ["weekend-uniform"],
    price: 8200,
    compareAtPrice: 9900,
    description:
      "Our softest runner yet. A seamless knit upper wraps the foot while a lightweight foam midsole keeps the weight down. Designed for long walks and longer days.",
    details: [
      "Seamless recycled knit upper",
      "Lightweight EVA midsole",
      "Reflective heel detail",
      "Removable footbed",
    ],
    material: "Recycled knit upper, EVA midsole, rubber outsole",
    care: "Wipe clean. Do not machine wash.",
    images: [
      { src: photo("1560769629-975ec94e6a86"), alt: "Runner knit sneaker in stone" },
      { src: photo("1542291026-7eec264c27ff"), alt: "Runner sneaker detail" },
    ],
    colors: [
      { name: "Stone", hex: "#C9C2B4" },
      { name: "Sage", hex: "#8C9680" },
    ],
    sizes: shoeSizes,
    badge: "Sale",
    rating: 4.5,
    reviewCount: 96,
    inStock: true,
    stock: 9,
    featured: true,
    createdAt: "2026-09-20",
  },
  {
    id: "p-008",
    slug: "leather-tote",
    name: "Structured Leather Tote",
    category: "bags",
    collections: ["the-quiet-edit", "the-gifting-edit"],
    price: 9600,
    description:
      "A quiet workhorse. Full-grain leather, a wide opening, and enough room for a 14-inch laptop, a notebook and the rest of it. Unlined so it stays light.",
    details: [
      "Fits a 14-inch laptop",
      "Full-grain vegetable-tanned leather",
      "Magnetic closure",
      "Interior slip pocket",
    ],
    material: "100% full-grain vegetable-tanned leather",
    care: "Condition twice a year. Store in the dust bag provided.",
    images: [
      { src: photo("1594633312681-425c7b97ccd1"), alt: "Structured leather tote in tan" },
      { src: photo("1548036328-c9fa89d128fa"), alt: "Leather tote detail" },
    ],
    colors: [
      { name: "Tan", hex: "#A97B54" },
      { name: "Black", hex: "#22211F" },
      { name: "Olive", hex: "#5D6150" },
    ],
    sizes: oneSize,
    badge: "New",
    rating: 4.9,
    reviewCount: 58,
    inStock: true,
    stock: 10,
    featured: true,
    createdAt: "2026-10-02",
  },
  {
    id: "p-009",
    slug: "mini-shoulder-bag",
    name: "Mini Shoulder Bag",
    category: "bags",
    collections: ["the-gifting-edit"],
    price: 6200,
    description:
      "Small, but not precious. A compact shoulder bag with a curved base, an adjustable strap and a soft structure that sits close under the arm.",
    details: [
      "Adjustable strap",
      "Soft nappa leather",
      "Magnetic flap closure",
      "Cotton twill lining",
    ],
    material: "100% nappa leather; cotton twill lining",
    care: "Store flat in the dust bag. Avoid prolonged sun exposure.",
    images: [
      { src: photo("1584917865442-de89df76afd3"), alt: "Mini shoulder bag in black" },
      { src: photo("1594633312681-425c7b97ccd1"), alt: "Shoulder bag styling" },
    ],
    colors: [
      { name: "Black", hex: "#232220" },
      { name: "Cream", hex: "#E9E1D2" },
    ],
    sizes: oneSize,
    rating: 4.7,
    reviewCount: 39,
    inStock: true,
    stock: 15,
    featured: false,
    createdAt: "2026-08-28",
  },
  {
    id: "p-010",
    slug: "everyday-carry-pouch",
    name: "Everyday Carry Pouch",
    category: "bags",
    collections: ["weekend-uniform", "the-gifting-edit"],
    price: 4800,
    description:
      "A soft leather pouch for the things that get lost at the bottom of a bag. Use it alone with the wrist strap, or drop it into your tote.",
    details: [
      "Detachable wrist strap",
      "Suede lining",
      "Fits a phone, cards and keys",
      "Hand-finished edges",
    ],
    material: "Full-grain leather; suede lining",
    care: "Wipe with a soft dry cloth.",
    images: [
      { src: photo("1548036328-c9fa89d128fa"), alt: "Everyday carry pouch in tan" },
      { src: photo("1584917865442-de89df76afd3"), alt: "Leather pouch detail" },
    ],
    colors: [
      { name: "Tan", hex: "#B0835C" },
      { name: "Charcoal", hex: "#3D3B37" },
    ],
    sizes: oneSize,
    rating: 4.6,
    reviewCount: 67,
    inStock: true,
    stock: 22,
    featured: false,
    createdAt: "2026-07-05",
  },
  {
    id: "p-011",
    slug: "solid-signet-ring",
    name: "Solid Signet Ring",
    category: "jewelry",
    collections: ["the-gifting-edit"],
    price: 3400,
    description:
      "A softly rounded signet in recycled 18k gold vermeil. Substantial enough to wear alone, simple enough to stack. Engraving available in-store.",
    details: [
      "18k gold vermeil over recycled sterling silver",
      "Face measures 10mm",
      "Hypoallergenic",
      "Complimentary gift wrapping",
    ],
    material: "Recycled 925 sterling silver, 18k gold vermeil",
    care: "Remove before swimming. Polish with the cloth provided.",
    images: [
      { src: photo("1611085583191-a3b181a88401"), alt: "Solid signet ring in gold" },
      { src: photo("1515562141207-7a88fb7ce338"), alt: "Gold ring detail" },
    ],
    colors: [{ name: "Gold", hex: "#C7A25C" }],
    sizes: ["6", "7", "8", "9"],
    rating: 4.8,
    reviewCount: 51,
    inStock: true,
    stock: 30,
    featured: true,
    createdAt: "2026-04-19",
  },
  {
    id: "p-012",
    slug: "fine-chain-necklace",
    name: "Fine Chain Necklace",
    category: "jewelry",
    collections: ["the-gifting-edit"],
    price: 2900,
    description:
      "A whisper-thin chain that disappears on the neck and catches the light just enough. Wear it alone or as the base of a layered stack.",
    details: [
      "18k gold vermeil",
      "42cm with a 3cm extender",
      "Lobster clasp closure",
      "Comes in a recycled jewellery box",
    ],
    material: "Recycled 925 sterling silver, 18k gold vermeil",
    care: "Keep away from perfume. Store flat.",
    images: [
      { src: photo("1599643478518-a784e5dc4c8f"), alt: "Fine chain necklace in gold" },
      { src: photo("1611085583191-a3b181a88401"), alt: "Layered gold jewellery" },
    ],
    colors: [
      { name: "Gold", hex: "#C7A25C" },
      { name: "Silver", hex: "#C5C6C3" },
    ],
    sizes: oneSize,
    badge: "Bestseller",
    rating: 4.9,
    reviewCount: 173,
    inStock: true,
    stock: 40,
    featured: false,
    createdAt: "2026-03-11",
  },
  {
    id: "p-013",
    slug: "hand-thrown-stoneware-vase",
    name: "Hand-Thrown Stoneware Vase",
    category: "home",
    collections: ["objects-for-living", "the-gifting-edit"],
    price: 2400,
    description:
      "Hand-thrown in a small studio outside Dhaka, each vase carries the faint marks of the maker. A matte, speckled glaze and a shape that holds a single stem or a whole armful.",
    details: [
      "Hand-thrown stoneware",
      "Matte speckled glaze",
      "Approx. 22cm tall",
      "Each piece is unique",
    ],
    material: "Stoneware clay, food-safe glaze",
    care: "Hand wash. Not dishwasher safe.",
    images: [
      { src: photo("1602143407151-7111542de6e8"), alt: "Hand-thrown stoneware vase" },
      { src: photo("1519710164239-da123dc03ef4"), alt: "Ceramic objects on a shelf" },
    ],
    colors: [
      { name: "Oat", hex: "#D6CBB8" },
      { name: "Charcoal", hex: "#4A4843" },
    ],
    sizes: ["Small", "Large"],
    badge: "New",
    rating: 4.7,
    reviewCount: 28,
    inStock: true,
    stock: 14,
    featured: true,
    createdAt: "2026-10-09",
  },
  {
    id: "p-014",
    slug: "amber-cedar-candle",
    name: "Amber & Cedar Candle",
    category: "home",
    collections: ["objects-for-living", "the-gifting-edit"],
    price: 1600,
    description:
      "Amber, cedarwood and a trace of smoked vanilla. Poured by hand into a reusable stoneware vessel with a cotton wick and a clean, slow burn.",
    details: [
      "220g / approx. 45 hour burn",
      "Coconut and rapeseed wax blend",
      "Cotton wick",
      "Reusable stoneware vessel",
    ],
    material: "Coconut and rapeseed wax, cotton wick, stoneware vessel",
    care: "Trim the wick to 5mm before each burn.",
    images: [
      { src: photo("1584589167171-541ce45f1eea"), alt: "Amber and cedar candle" },
      { src: photo("1608571423902-eed4a5ad8108"), alt: "Ceramic home objects" },
    ],
    colors: [{ name: "Terracotta", hex: "#B5714F" }],
    sizes: oneSize,
    rating: 4.8,
    reviewCount: 112,
    inStock: true,
    stock: 35,
    featured: true,
    createdAt: "2026-09-12",
  },
  {
    id: "p-015",
    slug: "washed-linen-cushion",
    name: "Washed Linen Cushion",
    category: "home",
    collections: ["objects-for-living"],
    price: 2100,
    description:
      "A heavyweight washed linen cushion with a relaxed, slouchy fill. The kind of texture that makes a sofa look like someone actually lives there.",
    details: [
      "50 × 50cm",
      "Stonewashed European linen",
      "Responsibly sourced feather fill",
      "Hidden zip closure",
    ],
    material: "100% European linen; feather insert included",
    care: "Machine wash cover cold. Air dry.",
    images: [
      { src: photo("1586023492125-27b2c045efd7"), alt: "Washed linen cushion on a chair" },
      { src: photo("1555041469-a586c61ea9bc"), alt: "Living room with linen textiles" },
    ],
    colors: [
      { name: "Flax", hex: "#D8CBB4" },
      { name: "Olive", hex: "#7B7C63" },
      { name: "Rust", hex: "#A25F44" },
    ],
    sizes: oneSize,
    rating: 4.6,
    reviewCount: 44,
    inStock: true,
    stock: 19,
    featured: false,
    createdAt: "2026-06-24",
  },
  {
    id: "p-016",
    slug: "classic-field-watch",
    name: "Classic Field Watch",
    category: "accessories",
    collections: ["the-gifting-edit"],
    price: 11500,
    compareAtPrice: 13500,
    description:
      "A clean 38mm field watch with a brushed steel case, a warm off-white dial and a vegetable-tanned leather strap. Mechanical, understated, and made to be worn daily.",
    details: [
      "38mm brushed stainless steel case",
      "Japanese automatic movement",
      "Sapphire crystal",
      "Interchangeable leather strap",
    ],
    material: "Stainless steel, sapphire crystal, leather strap",
    care: "Water resistant to 5 ATM. Service every 3–5 years.",
    images: [
      { src: photo("1523275335684-37898b6baf30"), alt: "Classic field watch on a leather strap" },
      { src: photo("1524805444758-089113d48a6d"), alt: "Watch dial detail" },
    ],
    colors: [
      { name: "Steel / Tan", hex: "#B08A63" },
      { name: "Steel / Black", hex: "#2A2926" },
    ],
    sizes: oneSize,
    badge: "Sale",
    rating: 4.8,
    reviewCount: 63,
    inStock: true,
    stock: 6,
    featured: false,
    createdAt: "2026-02-16",
  },
];

export const heroImage = photo("1490481651871-ab68de25d43d", 2000);
export const storyImage = photo("1523381210434-271e8be1f52b", 1600);
export const campaignImage = photo("1483985988355-763728e1935b", 1600);
export const newsletterImage = photo("1555041469-a586c61ea9bc", 1600);

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((collection) => collection.slug === slug);
}

export function getProductsByCollection(slug: string): Product[] {
  return products.filter((product) => product.collections.includes(slug));
}

export function getFeaturedProducts(limit = 8): Product[] {
  return products.filter((product) => product.featured).slice(0, limit);
}

export function getNewArrivals(limit = 4): Product[] {
  return [...products]
    .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
    .slice(0, limit);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter(
      (candidate) =>
        candidate.id !== product.id &&
        (candidate.category === product.category ||
          candidate.collections.some((collection) =>
            product.collections.includes(collection)
          ))
    )
    .slice(0, limit);
}

export function searchProducts(query: string, limit = 6): Product[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];

  return products
    .filter((product) =>
      [product.name, product.category, product.description, ...product.collections]
        .join(" ")
        .toLowerCase()
        .includes(normalized)
    )
    .slice(0, limit);
}

export const categoryBySlug = (slug: string) =>
  categories.find((category) => category.slug === slug);
