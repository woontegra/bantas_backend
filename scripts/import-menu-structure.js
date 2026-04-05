import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function importMenuStructure() {
  console.log('🚀 Starting menu structure import...\n');

  try {
    // First, get all pages
    const pages = await prisma.page.findMany();
    const pageMap = {};
    pages.forEach(page => {
      pageMap[page.slug] = page.id;
    });

    // Define hierarchical menu structure
    const menuStructure = [
      {
        title: 'Kurumsal',
        titleEn: 'Corporate',
        titleAr: 'الشركة',
        slug: 'kurumsal',
        icon: 'Building2',
        order: 0,
        children: [
          { title: 'Hakkımızda', titleEn: 'About Us', titleAr: 'معلومات عنا', pageSlug: 'hakkimizda', order: 0 },
          { title: 'Tarihçe', titleEn: 'History', titleAr: 'التاريخ', pageSlug: 'tarihce', order: 1 },
          { title: 'Teknoloji', titleEn: 'Technology', titleAr: 'التكنولوجيا', pageSlug: 'teknoloji', order: 2 },
          { title: 'Kalite Belgelerimiz', titleEn: 'Quality Certificates', titleAr: 'شهادات الجودة', pageSlug: 'kalite-belgelerimiz', order: 3 },
          { title: 'İnsan Kaynakları', titleEn: 'Human Resources', titleAr: 'الموارد البشرية', pageSlug: 'insan-kaynaklari', order: 4 },
          { title: 'Sosyal Sorumluluk', titleEn: 'Social Responsibility', titleAr: 'المسؤولية الاجتماعية', pageSlug: 'sosyal-sorumluluk', order: 5 },
          {
            title: 'Politikalarımız',
            titleEn: 'Our Policies',
            titleAr: 'سياساتنا',
            slug: 'politikalarimiz',
            order: 6,
            children: [
              { title: 'Kalite Politikası', titleEn: 'Quality Policy', titleAr: 'سياسة الجودة', url: '/hakkimizda/politikalarimiz/kalite', order: 0 },
              { title: 'Gıda Güvenliği', titleEn: 'Food Safety', titleAr: 'سلامة الغذاء', url: '/hakkimizda/politikalarimiz/gida-guvenligi', order: 1 },
              { title: 'İş Sağlığı ve Güvenliği', titleEn: 'OHS', titleAr: 'الصحة والسلامة', url: '/hakkimizda/politikalarimiz/is-sagligi', order: 2 },
              { title: 'Bilgi Güvenliği', titleEn: 'Information Security', titleAr: 'أمن المعلومات', url: '/hakkimizda/politikalarimiz/bilgi-guvenligi', order: 3 },
              { title: 'İK Politikası', titleEn: 'HR Policy', titleAr: 'سياسة الموارد البشرية', url: '/hakkimizda/politikalarimiz/ik-politikasi', order: 4 },
              { title: 'KVKK', titleEn: 'GDPR', titleAr: 'حماية البيانات', url: '/hakkimizda/politikalarimiz/kvkk', order: 5 },
            ]
          }
        ]
      },
      {
        title: 'Ürünler',
        titleEn: 'Products',
        titleAr: 'منتجات',
        slug: 'urunler',
        icon: 'Package',
        order: 1,
        children: [
          { title: 'Tüm Ürünler', titleEn: 'All Products', titleAr: 'جميع المنتجات', url: '/urunler', order: 0 },
          { title: 'Peynir Tenekeleri', titleEn: 'Cheese Cans', titleAr: 'علب الجبن', url: '/peynir-tenekeleri', order: 1 },
          { title: 'Yağ Tenekeleri', titleEn: 'Oil Cans', titleAr: 'علب الزيت', url: '/yag-tenekeleri', order: 2 },
          { title: 'Zeytin & Turşu Tenekeleri', titleEn: 'Olive & Pickle Cans', titleAr: 'علب الزيتون', url: '/zeytin-tursu-tenekeleri', order: 3 },
          { title: 'Tiner, Antifriz, Madeni Yağ', titleEn: 'Thinner, Antifreeze, Oil', titleAr: 'المواد الكيميائية', url: '/tiner-antifriz-madeni-yag-tenekeleri', order: 4 },
        ]
      },
      {
        title: 'Yatırımcı İlişkileri',
        titleEn: 'Investor Relations',
        titleAr: 'علاقات المستثمرين',
        slug: 'yatirimci-iliskileri',
        icon: 'TrendingUp',
        order: 2,
        children: [
          { title: 'Yatırımcı İlişkileri', titleEn: 'Investor Relations', titleAr: 'علاقات المستثمرين', url: '/yatirimci-iliskileri', order: 0 },
          { title: 'Yönetim Kurulu', titleEn: 'Board of Directors', titleAr: 'مجلس الإدارة', url: '/yatirimci-iliskileri/yonetim-kurulu', order: 1 },
          { title: 'Ortaklık Yapısı', titleEn: 'Shareholding Structure', titleAr: 'هيكل الملكية', url: '/yatirimci-iliskileri/ortaklik-yapisi', order: 2 },
          { title: 'Komiteler', titleEn: 'Committees', titleAr: 'اللجان', url: '/yatirimci-iliskileri/komiteler', order: 3 },
          { title: 'Faaliyet Raporları', titleEn: 'Activity Reports', titleAr: 'تقارير النشاط', url: '/yatirimci-iliskileri/faaliyet-raporlari', order: 4 },
        ]
      },
      {
        title: 'Haberler',
        titleEn: 'News',
        titleAr: 'أخبار',
        slug: 'haberler',
        icon: 'Newspaper',
        url: '/haberler',
        order: 3
      },
      {
        title: 'Galeri',
        titleEn: 'Gallery',
        titleAr: 'معرض الصور',
        slug: 'galeri',
        icon: 'Image',
        url: '/galeri',
        order: 4
      },
      {
        title: 'İletişim',
        titleEn: 'Contact',
        titleAr: 'اتصل بنا',
        slug: 'iletisim',
        icon: 'Mail',
        url: '/iletisim',
        order: 5
      }
    ];

    // Recursive function to create menu items
    async function createMenuItem(item, parentId = null) {
      const menuItemData = {
        title: item.title,
        titleEn: item.titleEn,
        titleAr: item.titleAr,
        slug: item.slug,
        url: item.url,
        icon: item.icon,
        order: item.order,
        parentId: parentId,
        pageId: item.pageSlug ? pageMap[item.pageSlug] : null,
        active: true
      };

      const createdItem = await prisma.menuItem.create({
        data: menuItemData
      });

      console.log(`✅ Created: ${item.title}${parentId ? ' (child)' : ' (root)'}`);

      // Create children if any
      if (item.children && item.children.length > 0) {
        for (const child of item.children) {
          await createMenuItem(child, createdItem.id);
        }
      }

      return createdItem;
    }

    // Create all menu items
    for (const item of menuStructure) {
      await createMenuItem(item);
    }

    console.log('\n✨ Menu structure import completed successfully!');
    console.log('\nYou can now:');
    console.log('1. View menu at /tr/admin/menu-management');
    console.log('2. Edit menu items, add/remove, reorder');
    console.log('3. Menu will be used in navigation automatically');

  } catch (error) {
    console.error('❌ Error importing menu structure:', error);
  } finally {
    await prisma.$disconnect();
  }
}

importMenuStructure();
