// packages/prisma/seed.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Seed Categories
   const categories = await prisma.menuCategory.createMany({
    data: [
      { id: 1, name: "Appetizers", slug: "appetizers", description: "Start your meal right" },
      { id: 2, name: "Main Courses", slug: "main-courses", description: "Hearty entrees" },
      { id: 3, name: "Desserts", slug: "desserts", description: "Sweet treats" },
    ],
    skipDuplicates: true,
  });

  // Seed Menu Items
  const items = await prisma.menuItem.createMany({
    data: [
      { id: 1, name: "Garlic Bread", slug: "garlic-bread", description: "Toasted bread with garlic butter", price: 5.99,  categoryName: "Appetizers", isAvailable: true,  },
      { id: 2, name: "Caesar Salad", slug: "caesar-salad", description: "Fresh romaine lettuce with Caesar dressing", price: 8.99, categoryName: "Appetizers", isAvailable: true,  },
      { id: 3, name: "Spaghetti Bolognese", slug: "spaghetti-bolognese", description: "Classic pasta with meat sauce", price: 14.99, categoryName: "Main Courses", isAvailable: true,  },
      { id: 4, name: "Chocolate Cake", slug: "chocolate-cake", description: "Rich chocolate cake with ganache", price: 6.99, categoryName: "Desserts", isAvailable: true,  },
    ],
    skipDuplicates: true,
  });

  // Seed Menus
  const menus = await prisma.menu.createMany({
    data: [
      { id: 1, name: "Menu 1", slug: "menu-1", description: "Menu 1 description", image: "menu-1.jpg", position: 1, isAvailable: true },
      { id: 2, name: "Menu 2", slug: "menu-2", description: "Menu 2 description", image: "menu-2.jpg", position: 2, isAvailable: true },
    ],
    skipDuplicates: true,
  });

  // Seed Menus on Items
  // Menu 1
 const menu1 = await prisma.menu.update({
    where: {
      id: 1
    },
    data: {
      items: {
        connect: [
          { id: 1 },
          { id: 2 },
          { id: 3 },
          { id: 4 },
        ]
      }
    }
  });
// Menu 2
 const menu2 = await prisma.menu.update({
    where: {
      id: 2
    },
    data: {
      items: {
        connect: [
          { id: 1 },
          
        ]
      }
    }
  });

  console.info("Categories", categories)
  console.info("Items", items)
  console.info("Menus", menus)
  console.info("Menu 1", menu1)
  console.info("Menu 2", menu2)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })