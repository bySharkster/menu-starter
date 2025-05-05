"use server"
import { menuCategoriesPath } from "@/lib/paths"
import { menuCategoryFormSchema } from "@/lib/schemas/menu"
import { menuCategoriesOperations } from "@workspace/db/crud/menu"
import { generateSlug } from "@workspace/db/lib"
import type { MenuCategoryCreateInput, MenuCategoryUpdateInput } from "@workspace/db/types/MenuCategories"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function getCategories() {
    return menuCategoriesOperations.findMany()
}

export async function createCategory(formData: FormData) {
    const rawData: MenuCategoryCreateInput = {
        name: formData.get('name') as string,
        slug: generateSlug(formData.get('name') as string),
        description: formData.get('description') as string,
        position: Number(formData.get('position')),
        createdAt: new Date(),
        updatedAt: new Date()
    }
    const validatedResult = menuCategoryFormSchema.safeParse(rawData)

    if (!validatedResult.success) {
        throw validatedResult.error
    }

    return menuCategoriesOperations.create(validatedResult.data)
}

export async function updateCategory(formData: FormData) {
    const rawData: MenuCategoryUpdateInput = {
        id : Number(formData.get('id')),
        name: formData.get('name') as string,
        slug: generateSlug(formData.get('name') as string),
        description: formData.get('description') as string,
        position: Number(formData.get('position')),
    }

    const validatedResult = menuCategoryFormSchema.safeParse(rawData)

    if (!validatedResult.success) {
        throw validatedResult.error
    }

    const {id, ...data} = validatedResult.data

    const validatedData: MenuCategoryUpdateInput = {
        ...data,
        updatedAt: new Date()
    }

    await menuCategoriesOperations.update(Number(id), validatedData)
    
    revalidatePath(menuCategoriesPath);   
    redirect(menuCategoriesPath)
}

export async function deleteCategory(id: number) {
    try {
        await menuCategoriesOperations.delete(id);
        revalidatePath(menuCategoriesPath);
    } catch (error) {
        console.error('Failed to delete category:', error);
        throw error;
    }
}

/**
 * Finds a menu item by ID or slug
 * @remarks Use either id or slug, not both 
 * @param id - The ID of the menu item to find
 * @param slug - The slug of the menu item to find
 * @returns The menu item or null if not found
 * @example find(1) or find(undefined, 'slug')
 */
export async function findCategory(id?: number, slug?: string) {
    return menuCategoriesOperations.find(id, slug)
}