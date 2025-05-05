import React from "react";
import { getItems } from "@/app/actions/menuItems";
import { notFound } from "next/navigation";
import GoBack from "@/components/atoms/GoBack";
import Link from "next/link";
import { Button } from "@workspace/ui/components/button";
import { BookmarkPlus, BookPlus } from "lucide-react";
import { menuCategoriesPath, menuItemsPath } from "@/lib/paths";

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

      <h1 className="text-3xl font-semibold mb-8 text-center">Menu </h1>
      <div className="flex gap-4 justify-end">
      <Button asChild size="sm" variant="secondary">
        <Link href={menuCategoriesPath} className="mb-4">
          <BookPlus />
          Go to Categories
        </Link>
      </Button>
      <Button asChild size="sm" variant="secondary">
        <Link href={menuItemsPath} className="mb-4">
        <BookmarkPlus />
          Go to Menu Items
        </Link>
      </Button>
      </div>
      <div className="space-y-4">
        {/* <ViewMenuItems menuItems={menuItems} /> */}
      </div>
    </div>
  );
}