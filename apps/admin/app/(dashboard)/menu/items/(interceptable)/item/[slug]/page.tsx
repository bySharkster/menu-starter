import React from 'react'
import { notFound } from 'next/navigation'
import { findItem } from '@/app/actions/menuItems'
import { getCategories } from '@/app/actions/menuCategories'
import GoBack from '@/components/atoms/GoBack'
import { EditMenuItem } from '@/components/molecules/forms/EditMenuItem'
import { menuItemsPath } from '@/lib/paths'

export default async function EditMenuItemPage({params}: {params: Promise<{slug: string}>}) {
    const {slug} = await params

    const [menuItem, categories] = await Promise.all([
        findItem(undefined, slug),
        getCategories()
      ]);

    if (!menuItem || !categories) {
      notFound()    
     }

  return (
    <div>      
      <div className="flex flex-row justify-start items-center gap-4 mb-4">
        <GoBack link={menuItemsPath} />
        <h1 className="text-3xl font-semibold text-center ">Edit Menu Item</h1>
      </div>
    
      <EditMenuItem menuItem={menuItem} categories={categories} />
    </div>
  )
}
