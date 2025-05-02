
import { siteConfig } from "@workspace/db/utils/config";
import { AnimatedTabs } from "../templates/AnimatedTabs";

const tabs = [
  { label: "Menu Items", value: "menu-items" },
  { label: "Categories", value: "categories" },
  { label: "Preview", value: "preview" },
];

export default function MenuDashboard() {

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-col items-center gap-6">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          {siteConfig.siteName}
        </h1>
        <div className="w-full max-w-[90vw]">
          <AnimatedTabs tabs={tabs} />
        </div>
      </div>
    </div>
  );
}