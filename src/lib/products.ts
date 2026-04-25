export type ProductCategory = "Activewear" | "Casual" | "Dresses" | "Co-ord Sets" | "Bottoms";
export type Size = "S" | "M" | "L" | "XL";

import ribbedRed from "@/assets/proudct/product 1 (1).jpeg";
import ribbedMauveFront from "@/assets/proudct/WhatsApp Image 2026-04-25 at 10.36.06 AM (1).jpeg";
import ribbedMauveBack from "@/assets/proudct/product 1 (10).jpeg";
import tieredMaroon from "@/assets/proudct/product 1 (2).jpeg";
import tieredBrown from "@/assets/proudct/product 1 (3).jpeg";
import tieredPink from "@/assets/proudct/product 1 (5).jpeg";

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;          // LKR
  originalPrice?: number; // for discount strikethrough
  category: ProductCategory;
  sizes: Size[];
  images: string[];
  description: string;
  material: string;
  badge?: "New" | "Best Seller" | "Limited";
  rating: number;
  reviews: number;
}

const u = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const products: Product[] = [
  {
    id: "15", slug: "ribbed-pocket-mini-dress",
    name: "Aria Ribbed Pocket Mini Dress",
    price: 3890, originalPrice: 4800,
    category: "Dresses", sizes: ["S", "M", "L", "XL"],
    images: [ribbedRed, ribbedMauveFront, ribbedMauveBack],
    description: "A versatile mini dress in a soft ribbed knit. Features functional front pockets and a flattering A-line silhouette. Perfect for layering or wearing on its own.",
    material: "95% Cotton, 5% Spandex • Ribbed texture • Functional pockets",
    badge: "New", rating: 5.0, reviews: 12,
  },
  {
    id: "16", slug: "luna-tiered-midi-dress",
    name: "Luna Tiered Midi Dress",
    price: 4490, originalPrice: 5900,
    category: "Dresses", sizes: ["S", "M", "L", "XL"],
    images: [tieredMaroon, tieredBrown, tieredPink],
    description: "Flowy tiered midi dress with delicate spaghetti straps. Made from breathable fabric that's perfect for warm days and evening outings.",
    material: "Lightweight viscose • Tiered design • Adjustable straps",
    badge: "Best Seller", rating: 4.9, reviews: 45,
  },
  {
    id: "1", slug: "emerald-power-leggings",
    name: "Emerald Power High-Waist Leggings",
    price: 3490, originalPrice: 4900,
    category: "Activewear", sizes: ["S", "M", "L", "XL"],
    images: [u("photo-1506629082955-511b1aa562c8"), u("photo-1571019613454-1cb2f99b2d8b"), u("photo-1518310383802-640c2de311b2")],
    description: "Buttery-soft 4-way stretch high-waist leggings designed for studio, street and everything in between. Squat-proof, sweat-wicking, and made to move with confidence.",
    material: "78% Nylon, 22% Spandex • 4-way stretch • Squat-proof • Quick-dry",
    badge: "Best Seller", rating: 4.9, reviews: 214,
  },
  {
    id: "2", slug: "ribbed-crop-tank-cream",
    name: "Ribbed Crop Tank — Cream",
    price: 1890, originalPrice: 2490,
    category: "Casual", sizes: ["S", "M", "L"],
    images: [u("photo-1485518882345-15568b007407"), u("photo-1583743814966-8936f5b7be1a")],
    description: "A wardrobe essential. Soft ribbed knit crop tank with the perfect amount of stretch.",
    material: "92% Cotton, 8% Elastane • Ribbed knit • Soft & breathable",
    badge: "New", rating: 4.8, reviews: 96,
  },
  {
    id: "3", slug: "olive-coord-set",
    name: "Olive Lounge Co-ord Set",
    price: 4490, originalPrice: 5900,
    category: "Co-ord Sets", sizes: ["S", "M", "L", "XL"],
    images: [u("photo-1539109136881-3be0616acf4b"), u("photo-1495121605193-b116b5b9c5fe")],
    description: "Effortlessly chic two-piece set in deep olive. Pairs beautifully with sneakers or heels.",
    material: "Premium modal blend • Soft drape • Wrinkle-resistant",
    badge: "Best Seller", rating: 4.9, reviews: 142,
  },
  {
    id: "4", slug: "wide-leg-vintage-jeans",
    name: "Wide-Leg Vintage Jeans",
    price: 4900,
    category: "Bottoms", sizes: ["S", "M", "L", "XL"],
    images: [u("photo-1542272604-787c3835535d"), u("photo-1582418702059-97ebafb35d09")],
    description: "Relaxed wide-leg silhouette in a vintage wash. The 90s revival you'll wear on repeat.",
    material: "100% Cotton denim • Mid-weight • Non-stretch",
    badge: "New", rating: 4.7, reviews: 58,
  },
  {
    id: "5", slug: "sculpt-sports-bra-emerald",
    name: "Sculpt Sports Bra — Emerald",
    price: 2490, originalPrice: 3200,
    category: "Activewear", sizes: ["S", "M", "L", "XL"],
    images: [u("photo-1571019613540-996a5b3d29c5"), u("photo-1518310383802-640c2de311b2")],
    description: "Medium-support sculpting sports bra with removable pads. Designed for yoga, pilates and low-to-medium impact training.",
    material: "Compression knit • 4-way stretch • Moisture-wicking",
    rating: 4.8, reviews: 178,
  },
  {
    id: "6", slug: "midi-slip-dress-champagne",
    name: "Champagne Satin Midi Slip Dress",
    price: 4490, originalPrice: 5900,
    category: "Dresses", sizes: ["S", "M", "L"],
    images: [u("photo-1469334031218-e382a71b716b"), u("photo-1496747611176-843222e1e57c")],
    description: "Liquid-soft satin slip dress with adjustable straps. Date night ready.",
    material: "Satin charmeuse • Lined • Bias cut",
    badge: "Limited", rating: 4.9, reviews: 64,
  },
  {
    id: "7", slug: "everyday-bike-shorts",
    name: "Everyday Bike Shorts",
    price: 1890, originalPrice: 2490,
    category: "Activewear", sizes: ["S", "M", "L", "XL"],
    images: [u("photo-1591195853828-11db59a44f6b"), u("photo-1593079831268-3381b0db4a77")],
    description: "High-rise compression bike shorts with a hidden waistband pocket.",
    material: "4-way stretch • Squat-proof • Hidden pocket",
    rating: 4.7, reviews: 132,
  },
  {
    id: "8", slug: "linen-shirt-dress-beige",
    name: "Linen Shirt Dress — Beige",
    price: 3890,
    category: "Dresses", sizes: ["S", "M", "L"],
    images: [u("photo-1515372039744-b8f02a3ae446"), u("photo-1502716119720-b23a93e5fe1b")],
    description: "Breezy oversized linen shirt dress. Perfect for warm Colombo afternoons.",
    material: "100% European linen • Coconut buttons",
    badge: "New", rating: 4.6, reviews: 41,
  },
  {
    id: "9", slug: "cloud-soft-joggers",
    name: "Cloud-Soft Lounge Joggers",
    price: 2990, originalPrice: 3900,
    category: "Casual", sizes: ["S", "M", "L", "XL"],
    images: [u("photo-1552902865-b72c031ac5ea"), u("photo-1521334884684-d80222895322")],
    description: "Tapered fit lounge joggers in our signature cloud-soft fabric.",
    material: "Brushed cotton fleece • Drawstring waist",
    rating: 4.8, reviews: 187,
  },
  {
    id: "10", slug: "tennis-mini-dress-white",
    name: "Tennis Mini Dress — Ivory",
    price: 3490, originalPrice: 4490,
    category: "Activewear", sizes: ["S", "M", "L"],
    images: [u("photo-1554412933-514a83d2f3c8"), u("photo-1581044777550-4cfa60707c03")],
    description: "Pleated tennis-inspired mini dress with built-in shorts. Court to coffee.",
    material: "4-way stretch performance knit • Built-in shorts",
    badge: "New", rating: 4.7, reviews: 53,
  },
  {
    id: "11", slug: "frock-floral-emerald",
    name: "Emerald Floral Frock",
    price: 3290, originalPrice: 4200,
    category: "Dresses", sizes: ["S", "M", "L", "XL"],
    images: [u("photo-1572804013309-59a88b7e92f1"), u("photo-1566174053879-31528523f8ae")],
    description: "Tiered midi frock in painterly emerald floral print. Soft, romantic, made for golden hour.",
    material: "Viscose blend • Lined bodice • Side pockets",
    rating: 4.9, reviews: 88,
  },
  {
    id: "12", slug: "seamless-coord-mocha",
    name: "Seamless Co-ord — Mocha",
    price: 4290, originalPrice: 5500,
    category: "Co-ord Sets", sizes: ["S", "M", "L"],
    images: [u("photo-1483985988355-763728e1935b"), u("photo-1487744480471-9ca1bca6fb7d")],
    description: "Seamless ribbed two-piece in warm mocha. Sculpting fit, second-skin feel.",
    material: "Seamless ribbed knit • Squat-proof • 4-way stretch",
    badge: "Best Seller", rating: 4.9, reviews: 156,
  },
  {
    id: "13", slug: "oversized-tee-sage",
    name: "Oversized Boyfriend Tee — Sage",
    price: 1490, originalPrice: 1990,
    category: "Casual", sizes: ["S", "M", "L", "XL"],
    images: [u("photo-1503342217505-b0a15ec3261c"), u("photo-1581338834647-b0fb40704e21")],
    description: "Drop-shoulder oversized tee in soft sage. Throw on with anything.",
    material: "Heavyweight 100% cotton jersey",
    rating: 4.7, reviews: 110,
  },
  {
    id: "14", slug: "high-rise-flare-pants",
    name: "High-Rise Flare Pants — Black",
    price: 3990,
    category: "Bottoms", sizes: ["S", "M", "L", "XL"],
    images: [u("photo-1594633312681-425c7b97ccd1"), u("photo-1551803091-e20673f15770")],
    description: "Polished high-rise flare pants that elongate the silhouette.",
    material: "Stretch ponte knit • 4-way stretch",
    badge: "New", rating: 4.8, reviews: 72,
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const relatedProducts = (slug: string, limit = 4) => {
  const p = getProduct(slug);
  if (!p) return [];
  return products.filter((x) => x.slug !== slug && x.category === p.category).slice(0, limit);
};

export const categories: { name: ProductCategory; image: string; tagline: string }[] = [
  { name: "Activewear", image: u("photo-1571019613454-1cb2f99b2d8b"), tagline: "Move with confidence" },
  { name: "Casual", image: u("photo-1485518882345-15568b007407"), tagline: "Everyday essentials" },
  { name: "Dresses", image: u("photo-1469334031218-e382a71b716b"), tagline: "Effortlessly feminine" },
  { name: "Co-ord Sets", image: u("photo-1539109136881-3be0616acf4b"), tagline: "Match made easy" },
];
