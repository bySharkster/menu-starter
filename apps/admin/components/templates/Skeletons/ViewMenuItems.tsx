import { Skeleton } from "@workspace/ui/components/skeleton"

export const ViewMenuItemsSkeleton = () => {
    return (
<div className="flex flex-col space-y-3">
      <Skeleton className="min-h-[102px] h-[102px] w-full min-w-[250px] rounded-xl" />
      <Skeleton className="min-h-[102px] h-[102px] w-full min-w-[250px] rounded-xl" />
      <Skeleton className="min-h-[102px] h-[102px] w-full min-w-[250px] rounded-xl" />
      <Skeleton className="min-h-[102px] h-[102px] w-full min-w-[250px] rounded-xl" />
      <Skeleton className="min-h-[102px] h-[102px] w-full min-w-[250px] rounded-xl" />
      <Skeleton className="min-h-[102px] h-[102px] w-full min-w-[250px] rounded-xl" />
    </div>
    )
}