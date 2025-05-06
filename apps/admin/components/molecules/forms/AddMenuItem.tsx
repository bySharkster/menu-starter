"use client"
import React, { useActionState } from 'react'
import Form from 'next/form'
import { createItem } from '@/app/actions/menuItems'
import { Input } from '@workspace/ui/components/input'
import { RadioGroup, RadioGroupItem } from '@workspace/ui/components/radio-group'
import { Label } from '@workspace/ui/components/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@workspace/ui/components/select'
import type { MenuCategory } from '@workspace/db/types/MenuCategories'
import { Textarea } from '@workspace/ui/components/textarea'
import AddButton from '@/components/atoms/AddButton'
import { menuItemsPath } from '@/lib/paths'
import { useFormToastAndRedirect } from '@/hooks/useFormToastAndRedirect'

interface AddMenuItemProps {
    categories: MenuCategory[]
}

const initialState = { success: false, message: "" };

async function createItemReducer(
  state: typeof initialState,
  formData: FormData
) {
  return await createItem(formData);
}

export function AddMenuItem({categories}: AddMenuItemProps) {

  const [state, formAction, isPending] = useActionState(createItemReducer, initialState)

  useFormToastAndRedirect(state, "Item added successfully", menuItemsPath)

  return (
    <>
      <Form action={formAction} className='flex flex-col gap-4' formMethod="post">
            <Input type="hidden" name="id" defaultValue={""} />

            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Name</Label>
              <Input type="text" name="name" defaultValue={""} />
            </div>
           
            <div className="flex flex-col gap-2">
              <Label htmlFor="price">Price</Label>
              <Input type="text" name="price" defaultValue={""} />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea name="description" defaultValue={""} />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="image">Image</Label>
              <Input type="text" name="image" defaultValue={""} />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="categoryName">Category</Label>
              <Select name="categoryName" defaultValue={""}>
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
            <RadioGroup name="isAvailable" defaultValue={'false'} className="flex items-center space-x-2">
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
          <AddButton pending={isPending}/>
        </Form>
    </>
  )
}
