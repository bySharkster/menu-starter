import React from "react";
import { notFound } from "next/navigation";
import { getCategories } from "@/app/actions/menuCategories";
import { AddMenuItem } from "@/components/molecules/forms/AddMenuItem";
import Modal from "@/components/molecules/modal/modal";

export default async function AddMenuItemModal() {
  const categories = await getCategories();

  if (!categories) {
    notFound();
  }

  return (
    <Modal
      title="Add Menu Item"
      description="Here you can add your menu item"
      link="/menu/items"
      openPath="/menu/items/add"
    >
      <AddMenuItem categories={categories} />
    </Modal>
  );
}
