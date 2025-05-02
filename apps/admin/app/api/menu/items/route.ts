'use server'

import { NextResponse } from 'next/server';
import { menuItemsOperations } from '@workspace/db/crud/menu';

export async function POST(req: Request) {
  const data = await req.json();
  try {
    const menuItem = await menuItemsOperations.create(data);
    return NextResponse.json(menuItem);
  } catch (error) {
    console.error("Failed to create menu item", error);
    return NextResponse.json({ error: 'Failed to create menu item' }, { status: 500 });
  }
}