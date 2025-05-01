// packages/prisma/seed.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Seed Categories
   const categories = await prisma.menuCategory.createMany({
    data: [
      { id: 1, name: "Appetizers", description: "Start your meal right" },
      { id: 2, name: "Main Courses", description: "Hearty entrees" },
      { id: 3, name: "Desserts", description: "Sweet treats" },
    ],
    skipDuplicates: true,
  });

  // Seed Menu Items
  const items = await prisma.menuItem.createMany({
    data: [
      { id: 1, name: "Garlic Bread", description: "Toasted bread with garlic butter", price: 5.99, categoryId: 1 },
      { id: 2, name: "Caesar Salad", description: "Fresh romaine lettuce with Caesar dressing", price: 8.99, categoryId: 1 },
      { id: 3, name: "Spaghetti Bolognese", description: "Classic pasta with meat sauce", price: 14.99, categoryId: 2 },
      { id: 4, name: "Chocolate Cake", description: "Rich chocolate cake with ganache", price: 6.99, categoryId: 3 },
    ],
    skipDuplicates: true,
  });
  console.info("Categories", categories)
  console.info("Items", items)
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