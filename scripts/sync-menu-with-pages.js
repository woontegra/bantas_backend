import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function syncMenuWithPages() {
  console.log('🔄 Starting menu-to-pages synchronization...\n');

  try {
    // 1. Fetch all menu items
    const menuItems = await prisma.menuItem.findMany({
      include: {
        page: true
      }
    });

    console.log(`📋 Found ${menuItems.length} menu items\n`);

    // 2. Fetch all existing pages
    const existingPages = await prisma.page.findMany({
      select: { slug: true, title: true }
    });

    const existingSlugs = new Set(existingPages.map(p => p.slug));
    console.log(`📄 Found ${existingPages.length} existing pages\n`);

    // 3. Find menu items that need pages
    const itemsNeedingPages = menuItems.filter(item => {
      // Skip if no slug
      if (!item.slug) return false;
      
      // Skip if already has a page linked
      if (item.pageId) return false;
      
      // Skip if page already exists with this slug
      if (existingSlugs.has(item.slug)) return false;
      
      return true;
    });

    console.log(`🔍 Found ${itemsNeedingPages.length} menu items without pages:\n`);
    
    if (itemsNeedingPages.length === 0) {
      console.log('✅ All menu items already have corresponding pages!');
      return;
    }

    // 4. Create missing pages
    let created = 0;
    let errors = 0;

    for (const item of itemsNeedingPages) {
      try {
        // Create default sections
        const defaultSections = [
          {
            id: '1',
            type: 'hero',
            data: {
              title: item.title,
              titleEn: item.titleEn || item.title,
              titleAr: item.titleAr || item.title,
              subtitle: 'Ürün ve hizmetlerimiz hakkında detaylı bilgi'
            }
          },
          {
            id: '2',
            type: 'text',
            data: {
              heading: item.title,
              content: 'Bu sayfa için içerik henüz eklenmemiştir. Admin panelden düzenleyebilirsiniz.'
            }
          },
          {
            id: '3',
            type: 'cta',
            data: {
              title: 'Daha Fazla Bilgi',
              description: 'Ürünlerimiz hakkında detaylı bilgi almak için bizimle iletişime geçin',
              buttonText: 'İletişim',
              buttonLink: '/iletisim'
            }
          }
        ];

        // Create the page
        const newPage = await prisma.page.create({
          data: {
            title: item.title,
            titleEn: item.titleEn || item.title,
            titleAr: item.titleAr || item.title,
            slug: item.slug,
            template: 'default',
            sections: JSON.stringify(defaultSections),
            active: true
          }
        });

        // Link the menu item to the new page
        await prisma.menuItem.update({
          where: { id: item.id },
          data: { pageId: newPage.id }
        });

        console.log(`✅ Created page: "${item.title}" (/${item.slug})`);
        created++;

      } catch (error) {
        console.error(`❌ Error creating page for "${item.title}":`, error.message);
        errors++;
      }
    }

    console.log(`\n📊 Synchronization Summary:`);
    console.log(`   ✅ Created: ${created} pages`);
    if (errors > 0) {
      console.log(`   ❌ Errors: ${errors} pages`);
    }
    console.log(`   📄 Total pages now: ${existingPages.length + created}`);
    console.log(`\n🎯 Next steps:`);
    console.log(`1. Visit /tr/admin/pages-cms to see all pages`);
    console.log(`2. Visit /tr/admin/menu-management to verify menu links`);
    console.log(`3. Edit pages to add custom content`);

  } catch (error) {
    console.error('❌ Fatal error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

syncMenuWithPages();
