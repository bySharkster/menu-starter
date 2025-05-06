import React from "react";
import { TooltipWrapper } from "../templates/Wrappers/TootltipWrapper";
import { menuItemsPath } from "@/lib/paths";
import { Button } from "@workspace/ui/components/button";
import Link from "next/link";
import { Plus } from "lucide-react";

export const AddMenuItemButton = () => {
  return (
    <div className="flex flex-row gap-4 items-center flex-shrink-1">
      <TooltipWrapper content="Add New Menu Item">
        <Button asChild size="icon" variant="secondary" className="">
          <Link href={`${menuItemsPath}/add`}>
            <Plus />
          </Link>
        </Button>
      </TooltipWrapper>
    </div>
  );
};
