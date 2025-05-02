"use client";
import { type ReactNode, useRef } from "react";
import { useMenuStore } from "@/store/useMenuStore";
import type { MenuCategory } from "@workspace/db/types/MenuCategories";
import type { MenuItem } from "@workspace/db/types/MenuItems";

export function MenuStoreProvider({
  initialCategories,
  initialMenuItems,
  children,
}: {
  initialCategories: MenuCategory[];
  initialMenuItems: MenuItem[];
  children: ReactNode;
}) {
  const hydrated = useRef(false);
  if (!hydrated.current) {
    useMenuStore.getState().setInitialData(initialCategories, initialMenuItems);
    hydrated.current = true;
  }
  return <>{children}</>;
}