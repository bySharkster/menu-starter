import "server-only"
import type { Menu, MenuCategory, MenuItem } from "@prisma/client"
import type { MenuItemCreateInput, MenuItemUpdateInput } from "../types/MenuItems"
import type { MenuCategoryCreateInput, MenuCategoryUpdateInput } from "../types/MenuCategories"
import type { MenuCreateInput, MenuUpdateInput } from "../types/Menu"
import prisma from "../utils/prismaClient"

export const menusOperations = {
    /**
     * Creates a new menu
     * @param data - The menu data to create
     * @returns The created menu
     */
    create: async (data: MenuCreateInput): Promise<Menu> => {
        return prisma.menu.create({
            data
        })
    },
    /**
     * Updates an existing menu
     * @param id - The ID of the menu to update
     * @param data - The menu data to update
     * @returns The updated menu
     */
    update: async (id: number, data: MenuUpdateInput): Promise<Menu> => {
        return prisma.menu.update({
            where: {id},
            data
        })
    },
    /**
     * Deletes a menu
     * @param id - The ID of the menu to delete
     * @returns The deleted menu
     */
    delete: async (id: number): Promise<Menu> => {
        return prisma.$transaction(async (tx) => {
            // Disconnect all items from this menu
            await tx.menu.update({
                where: { id },
                data: { items: { set: [] } }
            });
            // Now delete the menu
            return tx.menu.delete({
                where: { id }
            });
        });
    },
    /**
     * Finds a menu by ID or slug
     * @remarks Use either id or slug, not both 
     * @param id - The ID of the menu to find
     * @param slug - The slug of the menu to find
     * @returns The menu or null if not found
     * @example find(1) or find(undefined, 'slug')
     */
    find: async (id?: number, slug?: string): Promise<Menu | null> =>  {
        if ((!id && !slug) || (id && slug)) return null;
    
        if (slug) {
            return prisma.menu.findUnique({ where: { slug } });
        }
    
        if (id) {
            return prisma.menu.findUnique({ where: { id } });
        }
    
        return null;
    },
    /**
     * Retrieves all menus
     * @returns Array of menus sorted by position
     */
    findMany: async (): Promise<Menu[]> => {
        return prisma.menu.findMany({orderBy: {position: 'asc'}})
    },
    /**
     * Adds an item to a menu
     * @param menuId - The ID of the menu to add the item to
     * @param itemId - The ID of the item to add
     * @returns The updated menu
     */
    addItemToMenu: async (menuId: number, itemId: number) => {
    return prisma.menu.update({
        where: {id: menuId},
        data: {
            items: {
                connect: {id: itemId}
            }
        }
    })
    },

    /**
     * Removes an item from a menu
     * @param menuId - The ID of the menu to remove the item from
     * @param itemId - The ID of the item to remove
     * @returns The updated menu
     */
    removeItemFromMenu: async (menuId: number, itemId: number) => {
        return prisma.menu.update({
            where: {id: menuId},
            data: {
                items: {
                    disconnect: {id: itemId}
                }
            }
        })
    },

    /**
     * Retrieves a menu with its items
     * @param id - The ID of the menu to retrieve
     * @returns The menu with items
     */
    getMenuWithItems: async (id: number) => {
        return prisma.menu.findUnique({
            where: {id},
            include: {
                items: true
            }
        })
    },

}

export const menuItemsOperations = {
    /**
     * Creates a new menu item
     * @param data - The menu item data to create
     * @returns The created menu item
     */
    create: async (data: MenuItemCreateInput): Promise<MenuItem> => {
        return prisma.menuItem.create({
            data
        })
    },
    /**
     * Updates an existing menu item
     * @param id - The ID of the menu item to update
     * @param data - The menu item data to update
     * @returns The updated menu item
     */
    update: async (id: number, data: MenuItemUpdateInput): Promise<MenuItem> => {
        const updatedMenuItem = prisma.menuItem.update({
            where: {id},
            data
        })
        return updatedMenuItem
    },
    /**
     * Deletes a menu item
     * @param id - The ID of the menu item to delete
     * @returns The deleted menu item
     */
    delete: async (id: number ): Promise<MenuItem> => {
        return prisma.menuItem.delete({
            where: {id},
        })
    },
    /**
     * Finds a menu item by ID or slug
     * @remarks Use either id or slug, not both 
     * @param id - The ID of the menu item to find
     * @param slug - The slug of the menu item to find
     * @returns The menu item or null if not found
     * @example find(1) or find(undefined, 'slug')
     */
    find: async (id?: number, slug?: string): Promise<MenuItem | null> =>  {
        if ((!id && !slug) || (id && slug)) return null;
    
        if (slug) {
            return prisma.menuItem.findUnique({ where: { slug } });
        }
    
        if (id) {
            return prisma.menuItem.findUnique({ where: { id } });
        }
    
        return null;
    },
    /**
     * Retrieves all menu items
     * @returns Array of menu items sorted by position
     */
    findMany: async (): Promise<MenuItem[]> => {
        return prisma.menuItem.findMany({orderBy: {position: 'asc'}})
    },
    /**
     * Retrieves all menu items with their menus
     * @returns Array of menu items with menus
     */
    getMenuItemsWithMenus: async () => {
        return prisma.menuItem.findMany({
          include: { menus: true }
        });
      },
    /**
     * Retrieves a menu item with its menus
     * @param menuItemId - The ID of the menu item to retrieve
     * @returns The menu item with menus
     */
    getItemWithMenus: async (menuItemId: number) => {
        return prisma.menuItem.findUnique({
          where: { id: menuItemId },
          include: { menus: true }
        });
      },
}
   
export const menuCategoriesOperations = {
    /**
     * Creates a new menu category
     * @param data - The menu category data to create
     * @returns The created menu category
     */
    create: async (data: MenuCategoryCreateInput): Promise<MenuCategory> => {
        return prisma.menuCategory.create({
            data,
        })
    },
    /**
     * Updates an existing menu category
     * @param id - The ID of the menu category to update
     * @param data - The menu category data to update
     * @returns The updated menu category
     */
    update: async (id: number, data: MenuCategoryUpdateInput): Promise<MenuCategory> => {
        return prisma.menuCategory.update({
            where: {id},
            data
        })
    },
    /**
     * Deletes a menu category
     * @param id - The ID of the menu category to delete
     * @returns The deleted menu category
     */
    delete: async (id: number): Promise<MenuCategory> => {
        return prisma.menuCategory.delete({
            where: {id},
        })
    },
/**
     * Finds a menu category by ID or slug
     * @remarks Use either id or slug, not both 
     * @param id - The ID of the menu category to find
     * @param slug - The slug of the menu category to find
     * @returns The menu category or null if not found
     * @example find(1) or find(undefined, 'slug')
     */
find: async (id?: number, slug?: string): Promise<MenuCategory | null> =>  {
    if ((!id && !slug) || (id && slug)) return null;

    if (slug) {
        return prisma.menuCategory.findUnique({ where: { slug } });
    }

    if (id) {
        return prisma.menuCategory.findUnique({ where: { id } });
    }

    return null;
},
    /**
     * Retrieves all menu categories
     * @returns Array of menu categories
     */
    findMany: async (): Promise<MenuCategory[]> => {
        return prisma.menuCategory.findMany({})
    }
}