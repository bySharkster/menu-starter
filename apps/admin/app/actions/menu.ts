
"use server"

import { menuAvailabilitySchema, menuFormSchema } from "@/lib/schemas/menu"
import {  menusOperations } from "@workspace/db/crud/menu"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import type { MenuCreateInput, MenuUpdateInput } from "@workspace/db/types/Menu"
import { generateSlug } from "@workspace/db/lib"

export async function getMenus() {
    return menusOperations.findMany()
}

export async function createMenu(formData: FormData) {
    const rawData: MenuCreateInput = {
        name: formData.get('name') as string,
        slug: generateSlug(formData.get('name') as string),
        description: formData.get('description') as string,
        isAvailable: formData.get('isAvailable') === 'true',
        createdAt: new Date(),
        updatedAt: new Date()
    }
    const validatedResult = menuFormSchema.safeParse(rawData)

    if (!validatedResult.success) {
        throw validatedResult.error
    }

    return menusOperations.create(validatedResult.data)
}

export async function updateMenu(formData: FormData) {
    const rawData: MenuUpdateInput = {
        id : Number(formData.get('id')),
        name: formData.get('name') as string,
        slug: generateSlug(formData.get('name') as string),
        description: formData.get('description') as string,
        isAvailable: formData.get('isAvailable') === 'true',
    }

    const validatedResult = menuFormSchema.safeParse(rawData)

    if (!validatedResult.success) {
        throw validatedResult.error
    }

    const {id, ...data} = validatedResult.data

    const validatedData: MenuUpdateInput = {
        ...data,
        updatedAt: new Date()
    }

    await menusOperations.update(Number(id), validatedData)
    
    revalidatePath('/menu');   
    redirect('/menu')
}

export async function deleteMenu(id: number) {
    try {
        await menusOperations.delete(id);
        revalidatePath('/menu');
    } catch (error) {
        console.error('Failed to delete menu:', error);
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
export async function findMenu(id?: number, slug?: string) {
    return menusOperations.find(id, slug)
}

export async function toggleMenuAvailability(formData: FormData) {

    const rawData: MenuUpdateInput = {
        id: Number(formData.get('id')),
        isAvailable: formData.get('isAvailable') === 'true',
    }

    const validatedResult = menuAvailabilitySchema.safeParse(rawData)

    if (!validatedResult.success) {
        throw validatedResult.error
    }

    const {id, isAvailable} = validatedResult.data

    const updatedItem: MenuUpdateInput = {
        isAvailable,
        updatedAt: new Date()
    }

     const result = await menusOperations.update(Number(id), updatedItem)

    if (!result) {
        throw new Error('Failed to update menu')
    }
    revalidatePath('/menu'); 
    return result  

}

export async function removeMenuItem(formData: FormData) {
    const rawData: MenuUpdateInput = {
        id: Number(formData.get('id')),
        isAvailable: formData.get('isAvailable') === 'true',
    }

    const validatedResult = menuAvailabilitySchema.safeParse(rawData)

    if (!validatedResult.success) {
        throw validatedResult.error
    }

    const {id, isAvailable} = validatedResult.data

    const updatedItem: MenuUpdateInput = {
        isAvailable,
        updatedAt: new Date()
    }

     const result = await menusOperations.update(Number(id), updatedItem)

    if (!result) {
        throw new Error('Failed to update menu')
    }
    revalidatePath('/menu'); 
    return result  

}