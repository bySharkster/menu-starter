import { ViewMenuItemsSkeleton } from "@/components/templates/Skeletons/ViewMenuItems"

import React from 'react'

export default function Loading() {
  return (
    <div className="w-full max-w-3xl mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-8 text-center">Menu</h1>
      <div className="space-y-4">
        <ViewMenuItemsSkeleton />
      </div>
    </div>  )
}
