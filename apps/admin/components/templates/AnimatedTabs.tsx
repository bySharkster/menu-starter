'use client';

import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {useTabs, type Tab } from '@/hooks/useTabs';
import { cn } from '@workspace/ui/lib/utils';
import type { MenuCategory } from '@workspace/db/types/MenuCategories';
import type { MenuItem } from '@workspace/db/types/MenuItems';
import { Button } from '@workspace/ui/components/button';
import { PlusIcon } from 'lucide-react';
import { CreateMenuModal } from '../organisms/CreateMenuModal';
import { useMenuStore } from '@/store/useMenuStore';

interface AnimatedTabsProps {
  tabs: Tab[];

}

interface TabContentProps {
  tab: Tab;

}

const transition = {
  type: 'tween',
  ease: 'easeOut',
  duration: 0.15
};

const getHoverAnimationProps = (hoveredRect: DOMRect, navRect: DOMRect) => ({
  x: hoveredRect.left - navRect.left - 10,
  y: hoveredRect.top - navRect.top - 4,
  width: hoveredRect.width + 20,
  height: hoveredRect.height + 10
});

const TabContent = ({ tab }: TabContentProps) => {

  const { menuItems, categories } = useMenuStore();

  return (
    <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={transition}
    className="p-6 bg-zinc-50 dark:bg-zinc-900 rounded-lg mt-4 h-[55vh] w-full max-w-[90vw] overflow-y-auto "
  >
    {tab.value === 'menu-items' && (
      <div>
        <div className="flex items-center justify-between mb-6 gap-2 md:gap-0">
          <h2 className="text-2xl font-bold">Menu Items</h2>
         <CreateMenuModal/>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {menuItems.map(item => (
            <div key={item.id} className="p-4 bg-white dark:bg-zinc-800 rounded shadow flex flex-col gap-2 w-full min-w-[250px] max-w-[400px] mx-auto">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-zinc-500">{item.categoryId}</p>
                </div>
                <span className="text-lg font-bold">${item.price.toFixed(2)}</span>
              </div>
              <p className="text-sm text-zinc-700 dark:text-zinc-300">{item.description}</p>
              <div className="flex gap-2 mt-2">
                <button type="button" className="text-xs bg-zinc-200 dark:bg-zinc-700 px-3 py-1 rounded hover:bg-zinc-300 dark:hover:bg-zinc-600">Edit</button>
                <button type="button" className="text-xs bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
    {tab.value === 'categories' && (
      <div>
        <div className="flex items-center justify-between mb-6 gap-2 md:gap-0 ">
        <h2 className="text-2xl font-bold">Categories</h2>
          <Button size="icon" className="bg-black text-white px-4 py-2 rounded hover:bg-zinc-800 transition"><PlusIcon/></Button>
        </div>
        <div className="grid md:grid-cols-2 gap-4 w-full max-w-3xl mx-auto">
          {categories.map(cat => (
            <div key={cat.id} className="p-4 bg-white dark:bg-zinc-800 rounded shadow flex flex-col gap-2 w-full min-w-[250px] max-w-[400px] mx-auto">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">{cat.name}</h3>
                <span className="text-xs text-zinc-400">{categories.filter(i => i.name === cat.name).length} items</span>
              </div>
              <p className="text-sm text-zinc-700 dark:text-zinc-300">{cat.description}</p>
              <div className="flex gap-2 mt-2">
                <button type="button" className="text-xs bg-zinc-200 dark:bg-zinc-700 px-3 py-1 rounded hover:bg-zinc-300 dark:hover:bg-zinc-600">Edit</button>
                <button type="button" className="text-xs bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}

    {tab.value === 'preview' && (
      <div >
        <h2 className="text-2xl font-bold mb-6">Menu Preview</h2>
        <div className="space-y-8">
          {categories.map(cat => (
            <div key={cat.id}>
              <h3 className="text-xl font-semibold mb-2">{cat.name}</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {menuItems.filter(i => i.categoryId === cat.id).map(item => (
                  <div key={item.id} className="p-4 bg-white dark:bg-zinc-800 rounded shadow flex flex-col gap-2 w-full min-w-[250px] max-w-[400px] mx-auto">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{item.name}</span>
                      <span className="text-zinc-500">${item.price.toFixed(2)}</span>
                    </div>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
  </motion.div>
  );
};

const Tabs = ({
  tabs,
  selectedTabIndex,
  setSelectedTab,
}: {
  tabs: Tab[];
  selectedTabIndex: number;
  setSelectedTab: (input: [number, number]) => void;
}): React.ReactElement => {
  const [buttonRefs, setButtonRefs] = React.useState<Array<HTMLButtonElement | null>>([]);

  React.useEffect(() => {
    setButtonRefs((prev) => prev.slice(0, tabs.length));
  }, [tabs.length]);

  const navRef = React.useRef<HTMLDivElement>(null);
  const navRect = navRef.current?.getBoundingClientRect();

  const selectedRect = buttonRefs[selectedTabIndex]?.getBoundingClientRect();

  const [hoveredTabIndex, setHoveredTabIndex] = React.useState<number | null>(null);
  const hoveredRect = buttonRefs[hoveredTabIndex ?? -1]?.getBoundingClientRect();

  return (
    <nav
      ref={navRef}
      className="flex flex-shrink-0 justify-center items-center relative z-0 py-2"
      onPointerLeave={() => setHoveredTabIndex(null)}>
      {tabs.map((item, i) => {
        const isActive = selectedTabIndex === i;

        return (
          <button
            type='button'
            key={item.value}
            className="text-sm relative rounded-md flex items-center h-8 px-4 z-20 bg-transparent cursor-pointer select-none transition-colors"
            onPointerEnter={() => setHoveredTabIndex(i)}
            onFocus={() => setHoveredTabIndex(i)}
            onClick={() => setSelectedTab([i, i > selectedTabIndex ? 1 : -1])}>
            <motion.span
              ref={(el) => {
                buttonRefs[i] = el as HTMLButtonElement;
              }}
              className={cn('block', {
                'text-zinc-500': !isActive,
                'text-black dark:text-white font-semibold': isActive
              })}>
              <small className={item.value === 'danger-zone' ? 'text-red-500' : ''}>{item.label}</small>
            </motion.span>
          </button>
        );
      })}

      <AnimatePresence>
        {hoveredRect && navRect && (
          <motion.div
            key="hover"
            className={`absolute z-10 top-0 left-0 rounded-md ${hoveredTabIndex === tabs.findIndex(({ value }) => value === 'danger-zone')
              ? 'bg-red-100 dark:bg-red-500/30'
              : 'bg-zinc-100 dark:bg-zinc-800'
              }`}
            initial={{ ...getHoverAnimationProps(hoveredRect, navRect), opacity: 0 }}
            animate={{ ...getHoverAnimationProps(hoveredRect, navRect), opacity: 1 }}
            exit={{ ...getHoverAnimationProps(hoveredRect, navRect), opacity: 0 }}
            transition={transition}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedRect && navRect && (
          <motion.div
            className={`absolute z-10 bottom-0 left-0 h-[2px] ${selectedTabIndex === tabs.findIndex(({ value }) => value === 'danger-zone')
              ? 'bg-red-500'
              : 'bg-black dark:bg-white'
              }`}
            initial={false}
            animate={{
              width: selectedRect.width + 18,
              x: `calc(${selectedRect.left - navRect.left - 9}px)`,
              opacity: 1
            }}
            transition={transition}
          />
        )}
      </AnimatePresence>
    </nav>
  );
};

export function AnimatedTabs({ tabs }: AnimatedTabsProps) {
  const [hookProps] = React.useState(() => {
    const initialTabId =
      tabs.find(
        (tab) => tab.value === 'menu-items'
      )?.value || tabs[0]?.value || '';

    return {
      tabs: tabs.map(({ label, value, subRoutes }) => ({
        label,
        value,
        subRoutes
      })),
      initialTabId
    };

  });

  const framer = useTabs(hookProps);

  return (
    <div className="w-full">
      <div className="relative flex w-full items-center justify-between border-b dark:border-dark-4 overflow-x-auto overflow-y-hidden">
        <Tabs {...framer.tabProps}  />
      </div>
      <AnimatePresence mode="wait">
        <TabContent tab={framer.selectedTab as Tab}/>
      </AnimatePresence>
    </div>
  );
}