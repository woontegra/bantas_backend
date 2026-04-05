import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedFooter() {
  console.log('🌱 Seeding footer data...');

  // Footer Info (Logo, Address, Phone, Copyright)
  const footerInfo = await prisma.footerInfo.create({
    data: {
      logoUrl: '/logo.png',
      companyName: 'Bantaş Metal Ambalaj',
      companyNameEn: 'Bantas Metal Packaging',
      companyNameAr: 'بانتاش للتعبئة المعدنية',
      address: 'Organize Sanayi Bölgesi 1. Cadde No: 123\nİzmir, Türkiye',
      addressEn: 'Organized Industrial Zone 1st Street No: 123\nIzmir, Turkey',
      addressAr: 'المنطقة الصناعية المنظمة الشارع الأول رقم: 123\nإزمير، تركيا',
      phone: '+90 (232) 123 45 67',
      email: 'info@bantas.com.tr',
      copyrightText: '© 2026 Bantaş Metal Ambalaj • Tüm hakları saklıdır.',
      copyrightTextEn: '© 2026 Bantas Metal Packaging • All rights reserved.',
      copyrightTextAr: '© 2026 بانتاش للتعبئة المعدنية • جميع الحقوق محفوظة.'
    }
  });

  // Social Media Links
  const socialLinks = await prisma.footerSocial.createMany({
    data: [
      {
        platform: 'Facebook',
        url: 'https://facebook.com/bantas',
        icon: 'facebook',
        order: 0,
        active: true
      },
      {
        platform: 'Twitter',
        url: 'https://twitter.com/bantas',
        icon: 'twitter',
        order: 1,
        active: true
      },
      {
        platform: 'Instagram',
        url: 'https://instagram.com/bantas',
        icon: 'instagram',
        order: 2,
        active: true
      },
      {
        platform: 'LinkedIn',
        url: 'https://linkedin.com/company/bantas',
        icon: 'linkedin',
        order: 3,
        active: true
      },
      {
        platform: 'YouTube',
        url: 'https://youtube.com/@bantas',
        icon: 'youtube',
        order: 4,
        active: true
      }
    ]
  });

  // Kurumsal Section
  const kurumsalSection = await prisma.footerSection.create({
    data: {
      title: 'Kurumsal',
      titleEn: 'Corporate',
      titleAr: 'الشركات',
      order: 0,
      active: true,
      links: {
        create: [
          {
            title: 'Hakkımızda',
            titleEn: 'About Us',
            titleAr: 'معلومات عنا',
            url: '/tr/hakkimizda',
            order: 0,
            active: true
          },
          {
            title: 'Tarihçe',
            titleEn: 'History',
            titleAr: 'التاريخ',
            url: '/tr/hakkimizda/tarihce',
            order: 1,
            active: true
          },
          {
            title: 'Vizyon & Misyon',
            titleEn: 'Vision & Mission',
            titleAr: 'الرؤية والرسالة',
            url: '/tr/hakkimizda/vizyon-misyon',
            order: 2,
            active: true
          },
          {
            title: 'Kalite Politikamız',
            titleEn: 'Quality Policy',
            titleAr: 'سياسة الجودة',
            url: '/tr/hakkimizda/kalite-politikamiz',
            order: 3,
            active: true
          }
        ]
      }
    }
  });

  // Ürünler Section
  const urunlerSection = await prisma.footerSection.create({
    data: {
      title: 'Ürünler',
      titleEn: 'Products',
      titleAr: 'المنتجات',
      order: 1,
      active: true,
      links: {
        create: [
          {
            title: 'Peynir Tenekeleri',
            titleEn: 'Cheese Cans',
            titleAr: 'علب الجبن',
            url: '/tr/peynir-tenekeleri',
            order: 0,
            active: true
          },
          {
            title: 'Yağ Tenekeleri',
            titleEn: 'Oil Cans',
            titleAr: 'علب الزيت',
            url: '/tr/yag-tenekeleri',
            order: 1,
            active: true
          },
          {
            title: 'Zeytin & Turşu Tenekeleri',
            titleEn: 'Olive & Pickle Cans',
            titleAr: 'علب الزيتون والمخلل',
            url: '/tr/zeytin-tursu-tenekeleri',
            order: 2,
            active: true
          },
          {
            title: 'Tiner & Antifriz Tenekeleri',
            titleEn: 'Thinner & Antifreeze Cans',
            titleAr: 'علب التنر ومضاد التجمد',
            url: '/tr/tiner-antifriz-madeni-yag-tenekeleri',
            order: 3,
            active: true
          }
        ]
      }
    }
  });

  // Hizmetler Section
  const hizmetlerSection = await prisma.footerSection.create({
    data: {
      title: 'Hizmetler',
      titleEn: 'Services',
      titleAr: 'الخدمات',
      order: 2,
      active: true,
      links: {
        create: [
          {
            title: 'Galeri',
            titleEn: 'Gallery',
            titleAr: 'المعرض',
            url: '/tr/galeri',
            order: 0,
            active: true
          },
          {
            title: 'Haberler',
            titleEn: 'News',
            titleAr: 'الأخبار',
            url: '/tr/haberler',
            order: 1,
            active: true
          },
          {
            title: 'İletişim',
            titleEn: 'Contact',
            titleAr: 'اتصل بنا',
            url: '/tr/iletisim',
            order: 2,
            active: true
          }
        ]
      }
    }
  });

  console.log('✅ Footer data seeded successfully!');
  console.log(`   - Footer Info: ${footerInfo.companyName}`);
  console.log(`   - Social Links: 5 platforms`);
  console.log(`   - ${kurumsalSection.title}: 4 links`);
  console.log(`   - ${urunlerSection.title}: 4 links`);
  console.log(`   - ${hizmetlerSection.title}: 3 links`);
}

seedFooter()
  .catch((e) => {
    console.error('❌ Error seeding footer:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
