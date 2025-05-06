"use client"
import React, { useActionState } from 'react'
import Form from 'next/form'
import { updateItem } from '@/app/actions/menuItems'
import { Input } from '@workspace/ui/components/input'
import { RadioGroup, RadioGroupItem } from '@workspace/ui/components/radio-group'
import { Label } from '@workspace/ui/components/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@workspace/ui/components/select'
import type { MenuItem } from '@workspace/db/types/MenuItems'
import type { MenuCategory } from '@workspace/db/types/MenuCategories'
import EditButton from '@/components/atoms/EditButton'
import { Textarea } from '@workspace/ui/components/textarea'
import { menuItemsPath } from '@/lib/paths'
import { useFormToastAndRedirect } from '@/hooks/useFormToastAndRedirect'

interface EditMenuItemProps {
    menuItem: MenuItem
    categories: MenuCategory[]
}

const initialState = { success: false, message: "" };

async function updateItemReducer(
  state: typeof initialState,
  formData: FormData
) {
  return await updateItem(formData);
}

export function EditMenuItem({menuItem, categories}: EditMenuItemProps) {

  const [state, formAction, isPending] = useActionState(updateItemReducer, initialState)

  useFormToastAndRedirect(state, "Item updated successfully", menuItemsPath)

  return (
    <>
      <Form action={formAction} className='flex flex-col gap-4' formMethod="post">
            <Input type="hidden" name="id" defaultValue={menuItem.id} />

            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Name</Label>
              <Input type="text" name="name" defaultValue={menuItem.name} />
            </div>
           
            <div className="flex flex-col gap-2">
              <Label htmlFor="price">Price</Label>
              <Input type="text" name="price" defaultValue={menuItem.price} />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea name="description" defaultValue={menuItem.description ?? ''} />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="image">Image</Label>
              <Input type="text" name="image" defaultValue={menuItem.image ?? ''} />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="categoryName">Category</Label>
              <Select name="categoryName" defaultValue={menuItem.categoryName}>
              <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
              {categories.length === 0 ? (
                <SelectItem value="" disabled>
                  No categories available
                </SelectItem>
              ) : (
                categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.name}>
                    {cat.name}
                  </SelectItem>
                ))
              )}
            </SelectContent>
            </Select>
            </div>
            <div className="py-4">
            <RadioGroup name="isAvailable" defaultValue={menuItem.isAvailable ? 'true' : 'false'} className="flex items-center space-x-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="true" id="available" />
                <Label htmlFor="available">Available</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="false" id="not-available" />
                <Label htmlFor="not-available">Not Available</Label>
              </div>
            </RadioGroup>
            </div>
          <EditButton pending={isPending}/>
        </Form>
    </>
  )
}
