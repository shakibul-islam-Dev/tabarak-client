"use client";

import { create } from "zustand";

type UiState = {
  cartOpen: boolean;
  searchOpen: boolean;
  mobileNavOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  setCartOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  setMobileNavOpen: (open: boolean) => void;
};

export const useUiStore = create<UiState>((set) => ({
  cartOpen: false,
  searchOpen: false,
  mobileNavOpen: false,
  openCart: () => set({ cartOpen: true }),
  closeCart: () => set({ cartOpen: false }),
  setCartOpen: (open) => set({ cartOpen: open }),
  setSearchOpen: (open) => set({ searchOpen: open }),
  setMobileNavOpen: (open) => set({ mobileNavOpen: open }),
}));
