import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedMegaMenu() {
  console.log('🌱 Seeding mega menu data...');

  // Kurumsal Kategorisi
  const kurumsalCategory = await prisma.menuCategory.create({
    data: {
      title: 'Kurumsal',
      titleEn: 'Corporate',
      titleAr: 'الشركات',
      slug: 'kurumsal',
      icon: 'Building2',
      order: 0,
      active: true,
      items: {
        create: [
          {
            title: 'Hakkımızda',
            titleEn: 'About Us',
            titleAr: 'معلومات عنا',
            slug: 'hakkimizda',
            link: '/hakkimizda',
            order: 0,
            active: true
          },
          {
            title: 'Tarihçe',
            titleEn: 'History',
            titleAr: 'التاريخ',
            slug: 'tarihce',
            link: '/tarihce',
            order: 1,
            active: true
          },
          {
            title: 'Teknoloji',
            titleEn: 'Technology',
            titleAr: 'التكنولوجيا',
            slug: 'teknoloji',
            link: '/teknoloji',
            order: 2,
            active: true
          },
          {
            title: 'Kalite Belgelerimiz',
            titleEn: 'Quality Certificates',
            titleAr: 'شهادات الجودة',
            slug: 'kalite-belgelerimiz',
            link: '/kalite-belgelerimiz',
            order: 3,
            active: true
          },
          {
            title: 'İnsan Kaynakları',
            titleEn: 'Human Resources',
            titleAr: 'الموارد البشرية',
            slug: 'insan-kaynaklari',
            link: '/insan-kaynaklari',
            order: 4,
            active: true
          },
          {
            title: 'Sosyal Sorumluluk',
            titleEn: 'Social Responsibility',
            titleAr: 'المسؤولية الاجتماعية',
            slug: 'sosyal-sorumluluk',
            link: '/sosyal-sorumluluk',
            order: 5,
            active: true
          },
          {
            title: 'Kalite Politikası',
            titleEn: 'Quality Policy',
            titleAr: 'سياسة الجودة',
            slug: 'kalite',
            link: '/hakkimizda/politikalarimiz/kalite',
            order: 6,
            active: true
          },
          {
            title: 'Gıda Güvenliği',
            titleEn: 'Food Safety',
            titleAr: 'سلامة الغذاء',
            slug: 'gida-guvenligi',
            link: '/hakkimizda/politikalarimiz/gida-guvenligi',
            order: 7,
            active: true
          },
          {
            title: 'İş Sağlığı ve Güvenliği',
            titleEn: 'Occupational Health & Safety',
            titleAr: 'الصحة والسلامة المهنية',
            slug: 'is-sagligi',
            link: '/hakkimizda/politikalarimiz/is-sagligi',
            order: 8,
            active: true
          },
          {
            title: 'Bilgi Güvenliği',
            titleEn: 'Information Security',
            titleAr: 'أمن المعلومات',
            slug: 'bilgi-guvenligi',
            link: '/hakkimizda/politikalarimiz/bilgi-guvenligi',
            order: 9,
            active: true
          },
          {
            title: 'İK Politikası',
            titleEn: 'HR Policy',
            titleAr: 'سياسة الموارد البشرية',
            slug: 'ik-politikasi',
            link: '/hakkimizda/politikalarimiz/ik-politikasi',
            order: 10,
            active: true
          },
          {
            title: 'KVKK',
            titleEn: 'GDPR',
            titleAr: 'حماية البيانات',
            slug: 'kvkk',
            link: '/hakkimizda/politikalarimiz/kvkk',
            order: 11,
            active: true
          },
          {
            title: 'KVKK Başvuru Formu',
            titleEn: 'GDPR Application Form',
            titleAr: 'نموذج طلب حماية البيانات',
            slug: 'kvkk-basvuru-formu',
            link: '/hakkimizda/politikalarimiz/kvkk-basvuru-formu',
            order: 12,
            active: true
          },
          {
            title: 'Web Sitesi Aydınlatma',
            titleEn: 'Website Disclosure',
            titleAr: 'إفصاح الموقع',
            slug: 'web-sitesi-aydinlatma',
            link: '/hakkimizda/politikalarimiz/web-sitesi-aydinlatma',
            order: 13,
            active: true
          }
        ]
      }
    }
  });

  // Ürünler Kategorisi
  const urunlerCategory = await prisma.menuCategory.create({
    data: {
      title: 'Ürünler',
      titleEn: 'Products',
      titleAr: 'منتجات',
      slug: 'urunler',
      icon: 'Package',
      order: 1,
      active: true,
      items: {
        create: [
          {
            title: 'Tüm Ürünler',
            titleEn: 'All Products',
            titleAr: 'جميع المنتجات',
            slug: 'urunler',
            link: '/urunler',
            order: 0,
            active: true
          },
          {
            title: 'Peynir Tenekeleri',
            titleEn: 'Cheese Cans',
            titleAr: 'علب الجبن',
            slug: 'peynir-tenekeleri',
            link: '/peynir-tenekeleri',
            order: 1,
            active: true
          },
          {
            title: 'Yağ Tenekeleri',
            titleEn: 'Oil Cans',
            titleAr: 'علب الزيت',
            slug: 'yag-tenekeleri',
            link: '/yag-tenekeleri',
            order: 2,
            active: true
          },
          {
            title: 'Zeytin & Turşu Tenekeleri',
            titleEn: 'Olive & Pickle Cans',
            titleAr: 'علب الزيتون والمخلل',
            slug: 'zeytin-tursu-tenekeleri',
            link: '/zeytin-tursu-tenekeleri',
            order: 3,
            active: true
          },
          {
            title: 'Tiner, Antifriz, Madeni Yağ',
            titleEn: 'Thinner, Antifreeze, Oil',
            titleAr: 'المواد الكيميائية',
            slug: 'tiner-antifriz-madeni-yag-tenekeleri',
            link: '/tiner-antifriz-madeni-yag-tenekeleri',
            order: 4,
            active: true
          }
        ]
      }
    }
  });

  // Haberler Kategorisi
  const haberlerCategory = await prisma.menuCategory.create({
    data: {
      title: 'Haberler',
      titleEn: 'News',
      titleAr: 'أخبار',
      slug: 'haberler',
      icon: 'Newspaper',
      order: 2,
      active: true,
      items: {
        create: [
          {
            title: 'Tüm Haberler',
            titleEn: 'All News',
            titleAr: 'جميع الأخبار',
            slug: 'haberler',
            link: '/tr/haberler',
            order: 0,
            active: true
          }
        ]
      }
    }
  });

  // Galeri Kategorisi
  const galeriCategory = await prisma.menuCategory.create({
    data: {
      title: 'Galeri',
      titleEn: 'Gallery',
      titleAr: 'معرض الصور',
      slug: 'galeri',
      icon: 'Image',
      order: 3,
      active: true,
      items: {
        create: [
          {
            title: 'Fotoğraf Galerisi',
            titleEn: 'Photo Gallery',
            titleAr: 'معرض الصور',
            slug: 'galeri',
            link: '/tr/galeri',
            order: 0,
            active: true
          }
        ]
      }
    }
  });

  // Yatırımcı İlişkileri Kategorisi
  const yatirimciCategory = await prisma.menuCategory.create({
    data: {
      title: 'Yatırımcı İlişkileri',
      titleEn: 'Investor Relations',
      titleAr: 'علاقات المستثمرين',
      slug: 'yatirimci-iliskileri',
      icon: 'TrendingUp',
      order: 3,
      active: true,
      items: {
        create: [
          {
            title: 'Yatırımcı İlişkileri',
            titleEn: 'Investor Relations',
            titleAr: 'علاقات المستثمرين',
            slug: 'yatirimci-iliskileri',
            link: '/yatirimci-iliskileri',
            order: 0,
            active: true
          },
          {
            title: 'Yönetim Kurulu',
            titleEn: 'Board of Directors',
            titleAr: 'مجلس الإدارة',
            slug: 'yonetim-kurulu',
            link: '/yatirimci-iliskileri/yonetim-kurulu',
            order: 1,
            active: true
          },
          {
            title: 'Ortaklık Yapısı',
            titleEn: 'Shareholding Structure',
            titleAr: 'هيكل الملكية',
            slug: 'ortaklik-yapisi',
            link: '/yatirimci-iliskileri/ortaklik-yapisi',
            order: 2,
            active: true
          },
          {
            title: 'Komiteler',
            titleEn: 'Committees',
            titleAr: 'اللجان',
            slug: 'komiteler',
            link: '/yatirimci-iliskileri/komiteler',
            order: 3,
            active: true
          },
          {
            title: 'Kurumsal Yönetim İlkeleri',
            titleEn: 'Corporate Governance',
            titleAr: 'مبادئ الحوكمة',
            slug: 'kurumsal-yonetim-ilkeleri',
            link: '/yatirimci-iliskileri/kurumsal-yonetim-ilkeleri',
            order: 4,
            active: true
          },
          {
            title: 'Politikalar',
            titleEn: 'Policies',
            titleAr: 'السياسات',
            slug: 'politikalar',
            link: '/yatirimci-iliskileri/politikalar',
            order: 5,
            active: true
          },
          {
            title: 'İmtiyazlı Paylar',
            titleEn: 'Privileged Shares',
            titleAr: 'الأسهم الممتازة',
            slug: 'imtiyazli-paylar',
            link: '/yatirimci-iliskileri/imtiyazli-paylar',
            order: 6,
            active: true
          },
          {
            title: 'Ticaret Sicil',
            titleEn: 'Trade Registry',
            titleAr: 'السجل التجاري',
            slug: 'ticaret-sicil',
            link: '/yatirimci-iliskileri/ticaret-sicil',
            order: 7,
            active: true
          },
          {
            title: 'Genel Kurul',
            titleEn: 'General Assembly',
            titleAr: 'الجمعية العامة',
            slug: 'genel-kurul',
            link: '/yatirimci-iliskileri/genel-kurul',
            order: 8,
            active: true
          },
          {
            title: 'Faaliyet Raporları',
            titleEn: 'Activity Reports',
            titleAr: 'تقارير النشاط',
            slug: 'faaliyet-raporlari',
            link: '/yatirimci-iliskileri/faaliyet-raporlari',
            order: 9,
            active: true
          }
        ]
      }
    }
  });

  // İletişim Kategorisi
  const iletisimCategory = await prisma.menuCategory.create({
    data: {
      title: 'İletişim',
      titleEn: 'Contact',
      titleAr: 'اتصل بنا',
      slug: 'iletisim',
      icon: 'Mail',
      order: 5,
      active: true,
      items: {
        create: [
          {
            title: 'İletişim',
            titleEn: 'Contact Us',
            titleAr: 'اتصل بنا',
            slug: 'iletisim',
            link: '/iletisim',
            order: 0,
            active: true
          }
        ]
      }
    }
  });

  console.log('✅ Mega menu data seeded successfully!');
  console.log(`   - ${kurumsalCategory.title}: 14 items`);
  console.log(`   - ${urunlerCategory.title}: 5 items`);
  console.log(`   - ${haberlerCategory.title}: 1 item`);
  console.log(`   - ${galeriCategory.title}: 1 item`);
  console.log(`   - ${yatirimciCategory.title}: 10 items`);
  console.log(`   - ${iletisimCategory.title}: 1 item`);
}

seedMegaMenu()
  .catch((e) => {
    console.error('❌ Error seeding mega menu:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
