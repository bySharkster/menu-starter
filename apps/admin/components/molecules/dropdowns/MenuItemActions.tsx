import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { Button } from "@workspace/ui/components/button";
import { MoreHorizontal } from "lucide-react";
import { Separator } from "@workspace/ui/components/separator";
import Link from "next/link";
import type { MenuItem } from "@workspace/db/types/MenuItems";
import { TooltipWrapper } from "@/components/templates/Wrappers/TootltipWrapper";

interface MenuItemActionsProps {
  item: MenuItem;
  onToggleAvailability: (formData: FormData) => Promise<void>;
  onDelete: (formData: FormData) => Promise<void>;
}

export const MenuItemActions = ({
  item,
  onToggleAvailability,
  onDelete,
}: MenuItemActionsProps) => {
  return (
    <TooltipWrapper content="More">
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="group/more">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link
                href={`/menu/items/item/${item.slug}`}
                aria-label={`Edit ${item.name}`}
              >
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <form action={onToggleAvailability}>
                <input type="hidden" name="id" value={item.id} />
                <input
                  type="hidden"
                  name="isAvailable"
                  value={item.isAvailable ? "false" : "true"}
                />
                <button
                  type="submit"
                  className="group/edit flex gap-1 "
                  aria-label={`Toggle ${item.name}`}
                >
                  {item.isAvailable ? "Disable" : "Enable"}
                </button>
              </form>
            </DropdownMenuItem>
            <Separator />
            <DropdownMenuItem asChild className="text-red-600">
              <form action={onDelete}>
                <input type="hidden" name="id" value={item.id} />
                <button
                  type="submit"
                  className="group/edit flex gap-1 text-red-600"
                  aria-label={`Delete ${item.name}`}
                >
                  Delete
                </button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </TooltipWrapper>
  );
};
