import { create } from 'zustand';
import { menuCategoriesOperations, menuItemsOperations } from "@workspace/db/crud/menu";
import type { MenuCategory } from "@workspace/db/types/MenuCategories";
import type { MenuItem } from "@workspace/db/types/MenuItems";

interface MenuState {
  categories: MenuCategory[];
  menuItems: MenuItem[];
  loading: boolean;
  setInitialData: (categories: MenuCategory[], menuItems: MenuItem[]) => void;
  fetchAll: () => Promise<void>;
  addCategory: (category: MenuCategory) => void;
  addMenuItem: (item: MenuItem) => void;
}

export const useMenuStore = create<MenuState>((set) => ({
  categories: [],
  menuItems: [],
  loading: false,
  setInitialData: (categories: MenuCategory[], menuItems: MenuItem[]) =>
    set({ categories, menuItems }),
  fetchAll: async () => {
    set({ loading: true });
    const [categories, menuItems] = await Promise.all([
      menuCategoriesOperations.findMany(),
      menuItemsOperations.findMany(),
    ]);
    set({ categories, menuItems, loading: false });
  },
  addCategory: (category: MenuCategory) =>
    set((state) => ({ categories: [...state.categories, category] })),
  addMenuItem: (item: MenuItem) => {
    set((state) => ({ menuItems: [...state.menuItems, item] }))
  }
}));