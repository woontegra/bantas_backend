/**
 * Ürün menüsü /urunler alt sayfaları — panelden yönetilecek kayıtlar.
 * Çalıştır: node scripts/seed-nav-product-pages.js
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const pages = [
  {
    slug: 'peynir-tenekeleri',
    order: 0,
    title: 'Peynir Tenekeleri',
    titleEn: 'Cheese tins',
    description: 'Peynir ambalajı için metal tenekeler.',
    descriptionEn: 'Metal tins for cheese packaging.',
  },
  {
    slug: 'yag-tenekeleri',
    order: 1,
    title: 'Yağ Tenekeleri',
    titleEn: 'Oil tins',
    description: 'Sıvı yağ ambalajı için metal tenekeler.',
    descriptionEn: 'Metal tins for liquid oil packaging.',
  },
  {
    slug: 'zeytin-tursu-tenekeleri',
    order: 2,
    title: 'Zeytin/Turşu Tenekeleri',
    titleEn: 'Olive / pickle tins',
    description: 'Zeytin ve turşu için metal ambalaj.',
    descriptionEn: 'Metal packaging for olives and pickles.',
  },
  {
    slug: 'tiner-antifriz-madeni-yag-tenekeleri',
    order: 3,
    title: 'Tiner/Antifriz/Madeni Yağ Tenekeleri',
    titleEn: 'Thinner / antifreeze / mineral oil tins',
    description: 'Endüstriyel sıvılar için metal tenekeler.',
    descriptionEn: 'Metal tins for industrial liquids.',
  },
];

async function main() {
  for (const p of pages) {
    const existing = await prisma.productPage.findUnique({
      where: { slug: p.slug },
    });
    if (existing) {
      console.log('Atlandı (var):', p.slug);
      continue;
    }
    await prisma.productPage.create({
      data: {
        ...p,
        active: true,
      },
    });
    console.log('Eklendi:', p.slug);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
