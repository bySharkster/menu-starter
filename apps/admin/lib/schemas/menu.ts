import { z } from "zod";

export const menuFormSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1),
    slug: z.string().min(1),
    description: z.string().min(1).optional(),
    position: z.number().optional(),
    isAvailable: z.boolean().optional(),
})

export const menuAvailabilitySchema = menuFormSchema.pick({id: true, isAvailable: true})


export const menuItemFormSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1).optional(),
  price: z.number().min(1),
  image: z.string().optional(),
  isAvailable: z.boolean().optional(),
  categoryName: z.string().min(1)
});

export const menuItemCreateSchema = menuItemFormSchema.omit({id: true})
export const menuItemAvailabilitySchema = menuItemFormSchema.pick({id: true, isAvailable: true})


export const menuCategoryFormSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1),
    slug: z.string().min(1),
    description: z.string().min(1).optional(),
    position: z.number().optional(),
})


