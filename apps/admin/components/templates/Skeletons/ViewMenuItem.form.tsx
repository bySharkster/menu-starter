import { Skeleton } from '@workspace/ui/components/skeleton'
import React from 'react'

export const ViewMenuItemSkeleton = () => {
  return (
    <div className="flex flex-col space-y-3">
    <Skeleton className="min-h-[14px] h-[14px] w-full min-w-[250px] rounded-xl" />
    <Skeleton className="min-h-[36px] h-[36px] w-full min-w-[250px] rounded-xl" />
    <Skeleton className="min-h-[14px] h-[14px] w-full min-w-[250px] rounded-xl" />
    <Skeleton className="min-h-[36px] h-[36px] w-full min-w-[250px] rounded-xl" />
    <Skeleton className="min-h-[14px] h-[14px] w-full min-w-[250px] rounded-xl" />
    <Skeleton className="min-h-[64px] h-[36px] w-full min-w-[250px] rounded-xl" />
    <Skeleton className="min-h-[14px] h-[14px] w-full min-w-[250px] rounded-xl" />
    <Skeleton className="min-h-[36px] h-[36px] w-full min-w-[250px] rounded-xl" />
    <Skeleton className="min-h-[14px] h-[14px] w-full min-w-[250px] rounded-xl" />
    <Skeleton className="min-h-[36px] h-[36px] w-full min-w-[250px] rounded-xl" />
    <Skeleton className="min-h-[16px] h-[16px] w-full max-w-[150px] rounded-xl" />
    <Skeleton className="min-h-[36px] h-[36px] w-full min-w-[250px] rounded-xl" />
    </div>
)
}
