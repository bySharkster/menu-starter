import type prisma from '../utils/prismaClient.js';

export type { Menu } from '@prisma/client';

export type MenuUpdateInput = Parameters<typeof prisma.menu.update>[0]["data"];
export type MenuCreateInput = Parameters<typeof prisma.menu.create>[0]["data"];