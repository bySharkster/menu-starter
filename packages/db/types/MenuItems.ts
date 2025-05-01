import type prisma from "../utils/prismaClient.js";

export type { MenuItem } from '@prisma/client';

export type MenuItemUpdateInput = Parameters<typeof prisma.menuItem.update>[0]["data"];
export type MenuItemCreateInput = Parameters<typeof prisma.menuItem.create>[0]["data"];