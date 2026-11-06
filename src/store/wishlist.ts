"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type WishlistState = {
  ids: string[];
  toggle: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
  has: (id: string) => boolean;
};

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) =>
        set((state) => ({
          ids: state.ids.includes(id)
            ? state.ids.filter((item) => item !== id)
            : [...state.ids, id],
        })),
      remove: (id) =>
        set((state) => ({ ids: state.ids.filter((item) => item !== id) })),
      clear: () => set({ ids: [] }),
      has: (id) => get().ids.includes(id),
    }),
    {
      name: "tabark-wishlist",
      version: 1,
      partialize: (state) => ({ ids: state.ids }),
    }
  )
);

export const selectWishlistCount = (state: WishlistState) => state.ids.length;
