import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function addSlugs() {
  console.log('🔧 Adding slugs to existing ProductCategories...');

  const categories = await prisma.productCategory.findMany();
  
  for (const category of categories) {
    const slug = category.name
      .toLowerCase()
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    
    await prisma.$executeRawUnsafe(
      `UPDATE "ProductCategory" SET slug = '${slug}' WHERE id = '${category.id}'`
    );
    
    console.log(`   - ${category.name} → ${slug}`);
  }

  console.log('✅ Slugs added successfully!');
}

addSlugs()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
