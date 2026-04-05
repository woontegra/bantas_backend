import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function clearMegaMenu() {
  console.log('🗑️  Clearing mega menu data...');

  // Delete in correct order (items first, then categories)
  await prisma.menuItem.deleteMany({});
  console.log('   - Deleted all menu items');

  await prisma.menuCategory.deleteMany({});
  console.log('   - Deleted all menu categories');

  console.log('✅ Mega menu data cleared successfully!');
}

clearMegaMenu()
  .catch((e) => {
    console.error('❌ Error clearing mega menu:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
