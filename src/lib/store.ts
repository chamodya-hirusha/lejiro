import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product, Size } from "./products";

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  size: Size;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  add: (product: Product, size: Size, quantity?: number) => void;
  remove: (productId: string, size: Size) => void;
  updateQty: (productId: string, size: Size, quantity: number) => void;
  clear: () => void;
  subtotal: () => number;
  count: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((s) => ({ isOpen: !s.isOpen })),
      add: (product, size, quantity = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.productId === product.id && i.size === size);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === product.id && i.size === size ? { ...i, quantity: i.quantity + quantity } : i,
              ),
            };
          }
          return {
            items: [
              ...state.items,
              { productId: product.id, slug: product.slug, name: product.name, price: product.price, image: product.images[0], size, quantity },
            ],
          };
        }),
      remove: (productId, size) =>
        set((state) => ({ items: state.items.filter((i) => !(i.productId === productId && i.size === size)) })),
      updateQty: (productId, size, quantity) =>
        set((state) => ({
          items: state.items
            .map((i) => (i.productId === productId && i.size === size ? { ...i, quantity } : i))
            .filter((i) => i.quantity > 0),
        })),
      clear: () => set({ items: [] }),
      subtotal: () => get().items.reduce((s, i) => s + i.price * i.quantity, 0),
      count: () => get().items.reduce((s, i) => s + i.quantity, 0),
    }),
    { name: "lejiro-cart" },
  ),
);

interface WishlistState {
  ids: string[];
  toggle: (id: string) => void;
  has: (id: string) => boolean;
}

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) =>
        set((s) => ({ ids: s.ids.includes(id) ? s.ids.filter((x) => x !== id) : [...s.ids, id] })),
      has: (id) => get().ids.includes(id),
    }),
    { name: "lejiro-wishlist" },
  ),
);

export const formatLKR = (n: number) =>
  `Rs. ${n.toLocaleString("en-LK", { maximumFractionDigits: 0 })}`;

export const WHATSAPP_NUMBER = "94711125159"; // intl format
export const WHATSAPP_DISPLAY = "071 112 5159";
export const whatsappUrl = (message?: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
