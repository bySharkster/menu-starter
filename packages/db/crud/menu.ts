import type { MenuCategory, MenuItem } from "@prisma/client"
import type { MenuItemCreateInput, MenuItemUpdateInput } from "../types/MenuItems"
import type { MenuCategoryCreateInput, MenuCategoryUpdateInput } from "../types/MenuCategories"
import prisma from "../utils/prismaClient"

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
        return prisma.menuItem.update({
            where: {id},
            data
        })
    },
    /**
     * Deletes a menu item
     * @param id - The ID of the menu item to delete
     * @returns The deleted menu item
     */
    delete: async (id: number): Promise<MenuItem> => {
        return prisma.menuItem.delete({
            where: {id},
        })
    },
    /**
     * Finds a menu item by ID
     * @param id - The ID of the menu item to find
     * @returns The menu item or null if not found
     */
    find: async (id: number): Promise<MenuItem | null> =>  {
        return prisma.menuItem.findUnique({where: {id}, cacheStrategy:{ttl: 3600, swr: 60}})
    },
    /**
     * Retrieves all menu items
     * @returns Array of menu items sorted by position
     */
    findMany: async (): Promise<MenuItem[]> => {
        return prisma.menuItem.findMany({orderBy: {position: 'asc'},
        cacheStrategy:{ttl: 3600, swr: 60}})
    }
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
     * Finds a menu category by ID
     * @param id - The ID of the menu category to find
     * @returns The menu category or null if not found
     */
    find: async (id: number): Promise<MenuCategory | null> =>  {
        return prisma.menuCategory.findUnique({where: {id}})
    },
    /**
     * Retrieves all menu categories
     * @returns Array of menu categories
     */
    findMany: async (): Promise<MenuCategory[]> => {
        return prisma.menuCategory.findMany({})
    }
}