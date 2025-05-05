import React from 'react'
import { notFound } from 'next/navigation'
import { getCategories, findCategory } from '@/app/actions/menuCategories'
import GoBack from '@/components/atoms/GoBack'
import { EditMenuCategory } from '@/components/molecules/forms/EditMenuCategory'

export default async function EditCategoryPage({params}: {params: Promise<{slug: string}>}) {
    const {slug} = await params

    const [category, categories] = await Promise.all([
        findCategory(undefined, slug),
        getCategories(),
      ]);

    if (!category || !categories) {
      notFound()    
     }

  return (
    <div>
        <GoBack link="/menu" /> 
        <h1 className="text-2xl font-bold">Edit Menu Category</h1>
        <div className="flex flex-col gap-4">
        <EditMenuCategory category={category} />
        </div>
    </div>
  )
}
