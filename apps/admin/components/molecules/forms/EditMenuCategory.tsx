import React from "react";
import Form from "next/form";
import { updateCategory } from "@/app/actions/menuCategories";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import type { MenuCategory } from "@workspace/db/types/MenuCategories";
import EditButton from "@/components/atoms/EditButton";

interface EditMenuCategoryProps {
  category: MenuCategory;
}

export function EditMenuCategory({ category }: EditMenuCategoryProps) {
  return (
    <>
      <Form
        action={updateCategory}
        className="flex flex-col gap-4"
        formMethod="post"
      >
        <Input type="hidden" name="id" defaultValue={category.id} />
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Name</Label>
          <Input type="text" name="name" defaultValue={category.name} />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="slug">Slug</Label>
          <Input type="text" name="slug" defaultValue={category.slug} />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="description">Description</Label>
          <Input
            type="text"
            name="description"
            defaultValue={category.description || ""}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="position">Position</Label>
          <Input
            type="number"
            name="position"
            defaultValue={category.position || 0}
          />
        </div>
        <EditButton pending={false} />
      </Form>
    </>
  );
}
