import type prisma from '../utils/prismaClient.js';

export type { MenuCategory } from '@prisma/client';

export type MenuCategoryUpdateInput = Parameters<typeof prisma.menuCategory.update>[0]["data"];
export type MenuCategoryCreateInput = Parameters<typeof prisma.menuCategory.create>[0]["data"];