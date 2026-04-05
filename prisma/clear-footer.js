import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function clearFooter() {
  console.log('🗑️  Clearing footer data...');

  // Delete in correct order (links first, then sections, then info and social)
  await prisma.footerLink.deleteMany({});
  console.log('   - Deleted all footer links');

  await prisma.footerSection.deleteMany({});
  console.log('   - Deleted all footer sections');

  await prisma.footerInfo.deleteMany({});
  console.log('   - Deleted all footer info');

  await prisma.footerSocial.deleteMany({});
  console.log('   - Deleted all social links');

  console.log('✅ Footer data cleared successfully!');
}

clearFooter()
  .catch((e) => {
    console.error('❌ Error clearing footer:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
