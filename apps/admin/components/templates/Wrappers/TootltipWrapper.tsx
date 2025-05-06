import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@workspace/ui/components/tooltip";
  import type React from "react";
  
  interface TooltipWrapperProps {
    children: React.ReactNode;
    content: React.ReactNode;
  }
  
  export function TooltipWrapper({ children, content }: TooltipWrapperProps) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{children}</TooltipTrigger>
          <TooltipContent>
            {content}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }