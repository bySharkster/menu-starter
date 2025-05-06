"use server";

import {
  menuItemAvailabilitySchema,
  menuItemCreateSchema,
  menuItemFormSchema,
} from "@/lib/schemas/menu";
import { menuItemsOperations } from "@workspace/db/crud/menu";
import type {
  MenuItemCreateInput,
  MenuItemUpdateInput,
} from "@workspace/db/types/MenuItems";
import { revalidatePath } from "next/cache";
import { generateSlug } from "@workspace/db/lib";
import { menuItemsPath } from "@/lib/paths";
import { cache } from "react";

export async function getItems() {
  return menuItemsOperations.findMany();
}

export async function createItem(formData: FormData) {
  try {
    const rawData: MenuItemCreateInput = {
      name: formData.get("name") as string,
      slug: generateSlug(formData.get("name") as string),
      price: Number(formData.get("price")),
      description: formData.get("description") as string,
      image: formData.get("image") as string,
      categoryName: formData.get("categoryName") as string,
      isAvailable: formData.get("isAvailable") === "true",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const validatedResult = menuItemCreateSchema.safeParse(rawData);

    if (!validatedResult.success) {
      throw validatedResult.error;
    }
    await menuItemsOperations.create(validatedResult.data);

    revalidatePath(menuItemsPath);
    return { success: true, message: "Item added successfully" };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, message: error.message || "Unknown error" };
    }
    return { success: false, message: "Unknown error" };
  }
}

export async function updateItem(formData: FormData) {
  try {
    const rawData: MenuItemUpdateInput = {
      id: Number(formData.get("id")),
      name: formData.get("name") as string,
      slug: generateSlug(formData.get("name") as string),
      price: Number(formData.get("price")),
      description: formData.get("description") as string,
      image: formData.get("image") as string,
      categoryName: formData.get("categoryName") as string,
      isAvailable: formData.get("isAvailable") === "true",
    };

    const validatedResult = menuItemFormSchema.safeParse(rawData);

    if (!validatedResult.success) {
      throw validatedResult.error;
    }

    const { id, ...data } = validatedResult.data;

    const validatedData: MenuItemUpdateInput = {
      ...data,
      updatedAt: new Date(),
    };

    await menuItemsOperations.update(Number(id), validatedData);

    revalidatePath(menuItemsPath);
    return { success: true, message: "Item updated successfully" };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, message: error.message || "Unknown error" };
    }
    return { success: false, message: "Unknown error" };
  }
}

export async function deleteItem(id: number) {
  try {
    await menuItemsOperations.delete(id);
    revalidatePath(menuItemsPath);
    return { success: true, message: "Item deleted successfully" };
  } catch (error) {
    console.error("Failed to delete item:", error);
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
export const findItem = cache(async function findItem(
  id?: number,
  slug?: string
) {
  return menuItemsOperations.find(id, slug);
});

export async function toggleItemAvailability(formData: FormData) {
  try {
    const rawData: MenuItemUpdateInput = {
      id: Number(formData.get("id")),
      isAvailable: formData.get("isAvailable") === "true",
    };

    const validatedResult = menuItemAvailabilitySchema.safeParse(rawData);

    if (!validatedResult.success) {
      throw validatedResult.error;
    }

    const { id, isAvailable } = validatedResult.data;

    const updatedItem: MenuItemUpdateInput = {
      isAvailable,
      updatedAt: new Date(),
    };

    const result = await menuItemsOperations.update(Number(id), updatedItem);

    if (!result) {
      throw new Error("Failed to update menu item");
    }
    revalidatePath(menuItemsPath);
    return result;
  } catch (error) {
    console.error("Failed to update menu item:", error);
    throw error;
  }
}
