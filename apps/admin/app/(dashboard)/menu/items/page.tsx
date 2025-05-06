import React from "react";
import { getItems } from "@/app/actions/menuItems";
import { ViewMenuItems } from "@/components/molecules/cards/ViewMenuItems";
import { notFound } from "next/navigation";
import GoBack from "@/components/atoms/GoBack";
import { AddMenuItemButton } from "@/components/atoms/AddMenuItemButton";
import { menuPath } from "@/lib/paths";

export default async function MenuPage() {
  const menuItems = await getItems();

  if (!menuItems) {
    notFound();
  }

  if (menuItems.length === 0) {
    return (
      <div className="w-full max-w-3xl mx-auto py-8">
        <h1 className="text-3xl font-semibold mb-8 text-center">Menu</h1>
        <div className="space-y-4">
          <p className="text-center text-muted-foreground">
            No menu items found
          </p>
          <GoBack link="/" text="Back to Dashboard" className="mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto py-8">
      <div className="flex flex-row justify-between items-center gap-4 mb-4">
        <div className="flex flex-row gap-4 items-center flex-1 ">
          <GoBack link={menuPath} />
          <h1 className="text-3xl font-semibold text-center ">Menu Items</h1>
        </div>
        <AddMenuItemButton />
      </div>
      <div className="space-y-4">
        <ViewMenuItems menuItems={menuItems} />
      </div>
    </div>
  );
}
