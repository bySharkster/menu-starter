import React from 'react'
import { notFound } from 'next/navigation'
import { getCategories } from '@/app/actions/menuCategories'
import GoBack from '@/components/atoms/GoBack'
import { menuItemsPath } from '@/lib/paths'
import { AddMenuItem } from '@/components/molecules/forms/AddMenuItem'


export default async function AddMenuItemPage() {
    const categories = await getCategories()

    if (!categories) {
      notFound()    
     }

  return (
    <div>      
      <div className="flex flex-row justify-start items-center gap-4 mb-4">
        <GoBack link={menuItemsPath} />
        <h1 className="text-3xl font-semibold text-center ">Add Menu Item</h1>
      </div>
    
      <AddMenuItem categories={categories} />
    </div>
  )
}
