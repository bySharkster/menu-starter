import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@workspace/ui/components/dialog'
import React from 'react'
import { PlusIcon } from 'lucide-react'
import {CreateMenuItemForm} from '../molecules/CreateMenuItemForm'
import { useMediaQuery } from '@workspace/ui/hooks/use-media-query'
import { Drawer, DrawerContent, DrawerHeader, DrawerTrigger } from '@workspace/ui/components/drawer'

export const CreateMenuModal = () => {
  const [open, setOpen] = React.useState(false)

  const isDesktop = useMediaQuery("(min-width: 724px)");

  if (isDesktop) {
  return (
<Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger>
    <div className="bg-black text-white px-4 py-2 rounded hover:bg-zinc-800 transition">
        <PlusIcon/>
     </div>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>
        Create Menu Item
      </DialogTitle>
      <DialogDescription>
        Fill out the form below to create a new menu item.
      </DialogDescription>

      <CreateMenuItemForm/>    

    </DialogHeader>
   
  </DialogContent>
</Dialog>
  )}

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <div className="bg-black text-white px-4 py-2 rounded hover:bg-zinc-800 transition">
          <PlusIcon/>
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className='text-left'>
          <DialogTitle>
            Create Menu Item
          </DialogTitle>
          <DialogDescription>
            Fill out the form below to create a new menu item.
          </DialogDescription>
        </DrawerHeader>
        <CreateMenuItemForm/>    
       
      </DrawerContent>
    </Drawer>
  )
}
