import React from "react";
import { getItems } from "@/app/actions/menuItems";
import { ViewMenuItems } from "@/components/molecules/cards/ViewMenuItems";
import { notFound } from "next/navigation";
import GoBack from "@/components/atoms/GoBack";
import Link from "next/link";
import { menuItemsPath, menuPath } from "@/lib/paths";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@workspace/ui/components/tooltip";
import { Button } from "@workspace/ui/components/button";
import { Plus } from "lucide-react";

export default async function MenuPage() {
  const menuItems = await getItems();
  
  if (!menuItems) {
    notFound()
  }

  if (menuItems.length === 0) {
    return (
      <div className="w-full max-w-3xl mx-auto py-8">
        <h1 className="text-3xl font-semibold mb-8 text-center">Menu</h1>
        <div className="space-y-4">
          <p className="text-center text-muted-foreground">No menu items found</p>
        <GoBack link="/" text="Back to Dashboard" className="mx-auto"/>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-3xl mx-auto py-8">
      <div className="flex flex-row justify-between items-center gap-4 mb-4">
        <div className="flex flex-row gap-4 items-center flex-1 ">
          <GoBack link={menuPath} />
          <h1 className="text-3xl font-semibold text-center ">Menu Items</h1>
        </div>
        <div className="flex flex-row gap-4 items-center flex-shrink-1">
        <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button
                    asChild
                    size="icon"
                    variant="secondary"
                    className=""
                    >
                    <Link href={`${menuItemsPath}/add`}>
                      <Plus />
                    </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add New Menu Item</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <div className="space-y-4">
        <ViewMenuItems menuItems={menuItems} />
      </div>
    </div>
  );
}