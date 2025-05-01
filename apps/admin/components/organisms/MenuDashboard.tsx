import { AnimatedTabs } from "../templates/AnimatedTabs";
import { menuCategoriesOperations, menuItemsOperations } from "@workspace/db/crud/menu";
import { siteConfig } from "@workspace/db/utils/config";

const tabs = [
  { label: "Menu Items", value: "menu-items" },
  { label: "Categories", value: "categories" },
  { label: "Preview", value: "preview" },
];

export default async function MenuDashboard() {

  const categories = await menuCategoriesOperations.findMany()
  const menuItems = await menuItemsOperations.findMany()

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex flex-col items-center gap-6">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          {siteConfig.siteName}
        </h1>
        <div className="w-full max-w-3xl">
          <AnimatedTabs tabs={tabs} categories={categories} menuItems={menuItems} />
        </div>
      </main>
    </div>
  );
}