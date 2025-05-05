"use client"

import React from 'react'
import type{ MenuItem } from '@workspace/db/types/MenuItems'
import { AnimatePresence, motion } from 'motion/react'
import { Card } from '@workspace/ui/components/card'
import { Button } from '@workspace/ui/components/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@workspace/ui/components/dropdown-menu'
import { Edit, MoreHorizontal } from 'lucide-react'
import Link from 'next/link'
import { Separator } from '@workspace/ui/components/separator'
import { Badge } from '@workspace/ui/components/badge'
import { cn } from '@workspace/ui/lib/utils'
import { deleteItem, toggleItemAvailability } from '@/app/actions/menuItems'
import { toast } from "@workspace/ui/lib/sonner"

export const ViewMenuItems = ({menuItems}: {menuItems: MenuItem[]}) => {
    
  const handleToggleItemAvailability = async (formData: FormData) => {
    try {
      const result = await toggleItemAvailability(formData)

      if(result) {
        toast.success("Item availability toggled successfully")
      }

    } catch (error) {
      console.error(error)
      toast.error("Failed to toggle item availability")
    }
  }

  const handleDeleteMenuItem = async (formData: FormData) => {
    try {
      await deleteItem(Number(formData.get('id')))

      toast.success("Item deleted successfully")

    } catch (error) {
      console.error(error)
      toast.error("Failed to delete item")
    }
  }

  

  return (
    <AnimatePresence>
        {menuItems.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.18 }}
          >
            <Card className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 group hover:shadow-lg transition-shadow">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                <div className="font-medium text-lg mb-1">{item.name}</div>
<Badge className= {cn( "text-sm mb-2", item.isAvailable ? 'bg-green-300' : 'bg-red-300')}>{item.isAvailable ? 'Available' : 'Not Available'}</Badge>
</div>

                <div className="text-muted-foreground text-sm mb-2">{item.description}</div>
              </div>
              <div className="flex items-center gap-2">
                <Button asChild variant="outline" size="sm" className="group/edit flex gap-1">
                  <Link href={`/menu/items/item/${item.slug}`}
                    aria-label={`Edit ${item.name}`}
                  >
                    <Edit className="h-4 w-4" />
                    <span className="hidden sm:inline">Edit</span>
                  </Link>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="group/more">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/menu/items/item/${item.slug}`} aria-label={`Edit ${item.name}`}>Edit</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild> 
                      <form action={handleToggleItemAvailability}>
                        <input type="hidden" name="id" value={item.id} />
                        <input type="hidden" name="isAvailable" value={item.isAvailable ? 'false' : 'true'} />
                      <button type="submit" className="group/edit flex gap-1 " aria-label={`Toggle ${item.name}`}>{item.isAvailable ? 'Disable' : 'Enable' }</button>
                     </form>
                    </DropdownMenuItem>
                    <Separator/>
                    <DropdownMenuItem asChild className="text-red-600">
                      <form action={handleDeleteMenuItem}>
                        <input type="hidden" name="id" value={item.id} />
                      <button type="submit" className="group/edit flex gap-1 text-red-600" aria-label={`Delete ${item.name}`}>Delete</button>
                     </form>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </Card>
          </motion.div>
        ))}
    </AnimatePresence>  )
}

