"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * Returns true once the component has mounted on the client.
 * Used to safely render persisted state (cart/wishlist counts) without
 * hydration mismatches.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
