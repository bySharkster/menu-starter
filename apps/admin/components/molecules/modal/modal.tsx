"use client";

import type { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@workspace/ui/components/dialog";

interface ModalProps {
  children: ReactNode;
  link: string;
  openPath: string;
  title?: string;
  description?: string;
}

// @params link: string - The link to redirect to when the modal is closed
// @params openPath: string - The path to open the modal
// @params title: string - The title of the modal
// @params description: string - The description of the modal

export default function Modal({ children, link = "/menu/item", openPath="/menu/item", title, description }: ModalProps) {
  const router = useRouter();
  const path = usePathname();

  const open = path.startsWith(openPath);
  
  const handleOnOpenChange = (open: boolean) => {
    if (!open) {
      router.push(link);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOnOpenChange}>
      <DialogContent className="sm:max-w-md">
      <DialogHeader>
          <DialogTitle>{title || "Modal"}</DialogTitle>
          <DialogDescription>
            {description || "Description"}
           </DialogDescription>
        </DialogHeader>
          {children}
        </DialogContent>
    </Dialog>
  );
}

