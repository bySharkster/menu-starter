import React from 'react'
import { notFound } from 'next/navigation'
import { findCategory, getCategories } from '@/app/actions/menuCategories'
import Modal from '@/components/molecules/modal/modal'
import { EditMenuCategory } from '@/components/molecules/forms/EditMenuCategory'

export default async function EditMenuCategoryModal({params}: {params: Promise<{slug: string}>}) {
    const {slug} = await params

    const [category, categories] = await Promise.all([
        findCategory(undefined, slug),
        getCategories()
      ]);

    if (!category || !categories) {
      notFound()    
     }

  return (
    <Modal title="Edit Menu Category" description="Here you can edit your menu category" link="/menu" openPath="/menu/category">
      <EditMenuCategory category={category} />
    </Modal>
  )
}
