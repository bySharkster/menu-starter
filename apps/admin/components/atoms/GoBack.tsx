"use client"

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@workspace/ui/lib/utils";

// @params link: string - The link to redirect to when the button is clicked
// @default link: "/menu"
// @returns A button that redirects to the specified link

interface GoBackProps {
    link?: string;
    text?: string;
    className?: string;
}

export default function GoBack({link = "/menu", text = "Back", className = ""}: GoBackProps) {
  const router = useRouter();

  return (
    <motion.button
      type="button"
      onClick={() => router.push(link)}
      aria-label="Go back"
      className={cn("flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-accent text-foreground shadow transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 ", className)}
      whileTap={{ scale: 0.94 }}
      tabIndex={0}
    >
      <ArrowLeft className="h-5 w-5" />
      <span className="font-medium text-base hidden sm:inline">{text}</span>
    </motion.button>
  );
}

