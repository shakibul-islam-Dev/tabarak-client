"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Product } from "@/types";

type AddOptions = {
  color?: string;
  size?: string;
  quantity?: number;
};

type CartState = {
  items: CartItem[];
  addItem: (product: Product, options?: AddOptions) => void;
  removeItem: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addItem: (product, options = {}) =>
        set((state) => {
          const color = options.color ?? product.colors[0]?.name ?? "Default";
          const size = options.size ?? product.sizes[0] ?? "One size";
          const quantity = Math.max(1, options.quantity ?? 1);
          const key = `${product.id}:${color}:${size}`;
          const maxQuantity = Math.max(1, Math.min(product.stock, 10));

          const existing = state.items.find((item) => item.key === key);

          if (existing) {
            return {
              items: state.items.map((item) =>
                item.key === key
                  ? {
                      ...item,
                      quantity: Math.min(
                        maxQuantity,
                        item.quantity + quantity
                      ),
                    }
                  : item
              ),
            };
          }

          return {
            items: [
              ...state.items,
              {
                key,
                productId: product.id,
                slug: product.slug,
                name: product.name,
                image: product.images[0]?.src ?? "",
                price: product.price,
                color,
                size,
                quantity: Math.min(maxQuantity, quantity),
                maxQuantity,
              },
            ],
          };
        }),

      removeItem: (key) =>
        set((state) => ({
          items: state.items.filter((item) => item.key !== key),
        })),

      updateQuantity: (key, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.key === key
              ? {
                  ...item,
                  quantity: Math.max(1, Math.min(item.maxQuantity, quantity)),
                }
              : item
          ),
        })),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "tabark-cart",
      version: 1,
      partialize: (state) => ({ items: state.items }),
    }
  )
);

export const selectCartCount = (state: CartState) =>
  state.items.reduce((total, item) => total + item.quantity, 0);

export const selectCartSubtotal = (state: CartState) =>
  state.items.reduce((total, item) => total + item.price * item.quantity, 0);

export const FREE_SHIPPING_THRESHOLD = 5000;
