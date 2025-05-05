import React from 'react'
import { notFound } from 'next/navigation'
import { findItem } from '@/app/actions/menuItems'
import { getCategories } from '@/app/actions/menuCategories'
import Modal from '@/components/molecules/modal/modal'
import {EditMenuItem} from '@/components/molecules/forms/EditMenuItem'

export default async function EditMenuItemModal({params}: {params: Promise<{slug: string}>}) {
    const {slug} = await params

    const [menuItem, categories] = await Promise.all([
        findItem(undefined, slug),
        getCategories()
      ]);

    if (!menuItem || !categories) {
      notFound()    
     }

  return (
    <Modal title="Edit Menu Item" description="Here you can edit your menu item" link="/menu/items" openPath="/menu/items/item">
      <EditMenuItem menuItem={menuItem} categories={categories} />
    </Modal>
  )
}
