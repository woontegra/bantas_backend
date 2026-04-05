import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedProductPages() {
  console.log('🌱 Seeding product pages...\n');

  const productPages = [
    {
      slug: 'peynir-tenekeleri',
      title: 'Peynir Tenekeleri',
      titleEn: 'Cheese Cans',
      titleAr: 'علب الجبن',
      subtitle: 'Gıda ambalaj çözümleri',
      subtitleEn: 'Food packaging solutions',
      subtitleAr: 'حلول تغليف الطعام',
      description: 'Yüksek kaliteli metal ambalaj çözümlerimiz ile peynir ürünlerinizi güvenle saklayın.\n\nGıda ile temas eden yüzeylerde kullanıma uygun, hijyenik üretim standartlarına sahip peynir tenekelerimiz, ürünlerinizin tazeliğini ve kalitesini korur.',
      descriptionEn: 'Store your cheese products safely with our high-quality metal packaging solutions.\n\nOur cheese cans, suitable for use on food contact surfaces and with hygienic production standards, preserve the freshness and quality of your products.',
      descriptionAr: 'قم بتخزين منتجات الجبن الخاصة بك بأمان مع حلول التعبئة المعدنية عالية الجودة.\n\nعلب الجبن لدينا، المناسبة للاستخدام على الأسطح الملامسة للطعام ومع معايير الإنتاج الصحية، تحافظ على نضارة وجودة منتجاتك.',
      mainImage: '/images/products/peynir-teneke.jpg',
      gallery: JSON.stringify([
        '/images/products/peynir-1.jpg',
        '/images/products/peynir-2.jpg',
        '/images/products/peynir-3.jpg',
        '/images/products/peynir-4.jpg'
      ]),
      features: JSON.stringify([
        'Gıda ile temas eden yüzeylerde kullanıma uygun',
        'Farklı boyut seçenekleri (5kg, 10kg, 18kg)',
        'Hijyenik üretim standartları',
        'Uzun ömürlü kullanım',
        'Hava geçirmez kapak sistemi',
        'Kolay açılır kapak'
      ]),
      featuresEn: JSON.stringify([
        'Suitable for food contact surfaces',
        'Different size options (5kg, 10kg, 18kg)',
        'Hygienic production standards',
        'Long-lasting use',
        'Airtight lid system',
        'Easy-open lid'
      ]),
      featuresAr: JSON.stringify([
        'مناسب للأسطح الملامسة للطعام',
        'خيارات حجم مختلفة (5 كجم، 10 كجم، 18 كجم)',
        'معايير الإنتاج الصحية',
        'استخدام طويل الأمد',
        'نظام غطاء محكم الإغلاق',
        'غطاء سهل الفتح'
      ]),
      tableData: JSON.stringify({
        columns: ['Boyut', 'Kapasite', 'Çap', 'Yükseklik'],
        rows: [
          ['5 kg', '5000 ml', '180 mm', '150 mm'],
          ['10 kg', '10000 ml', '240 mm', '180 mm'],
          ['18 kg', '18000 ml', '300 mm', '220 mm']
        ]
      }),
      ctaTitle: 'Fiyat Teklifi Alın',
      ctaTitleEn: 'Get a Quote',
      ctaTitleAr: 'احصل على عرض أسعار',
      ctaDescription: 'Ürünlerimiz hakkında detaylı bilgi ve fiyat teklifi için bizimle iletişime geçin',
      ctaDescriptionEn: 'Contact us for detailed information and price quote about our products',
      ctaDescriptionAr: 'اتصل بنا للحصول على معلومات مفصلة وعرض أسعار حول منتجاتنا',
      ctaButtonText: 'İletişim',
      ctaButtonTextEn: 'Contact',
      ctaButtonTextAr: 'اتصل',
      ctaButtonLink: '/iletisim',
      active: true
    },
    {
      slug: 'yag-tenekeleri',
      title: 'Yağ Tenekeleri',
      titleEn: 'Oil Cans',
      titleAr: 'علب الزيت',
      subtitle: 'Sıvı yağ ambalaj çözümleri',
      subtitleEn: 'Liquid oil packaging solutions',
      subtitleAr: 'حلول تغليف الزيت السائل',
      description: 'Zeytinyağı, ayçiçek yağı ve diğer sıvı yağlar için özel olarak tasarlanmış metal tenekelerimiz.\n\nSızdırmaz yapısı ve güvenli kapak sistemi ile ürünlerinizin kalitesini korur.',
      mainImage: '/images/products/yag-teneke.jpg',
      gallery: JSON.stringify([
        '/images/products/yag-1.jpg',
        '/images/products/yag-2.jpg'
      ]),
      features: JSON.stringify([
        'Sızdırmaz yapı',
        'Işık geçirmez malzeme',
        'Kolay dökme ağzı',
        'Farklı kapasite seçenekleri',
        'Gıda standartlarına uygun'
      ]),
      tableData: JSON.stringify({
        columns: ['Kapasite', 'Çap', 'Yükseklik'],
        rows: [
          ['5 L', '180 mm', '250 mm'],
          ['10 L', '220 mm', '300 mm'],
          ['18 L', '280 mm', '350 mm']
        ]
      }),
      ctaTitle: 'Fiyat Teklifi Alın',
      ctaDescription: 'Yağ tenekelerimiz hakkında detaylı bilgi için iletişime geçin',
      ctaButtonText: 'İletişim',
      ctaButtonLink: '/iletisim',
      active: true
    },
    {
      slug: 'tiner-tenekeleri',
      title: 'Tiner Tenekeleri',
      titleEn: 'Thinner Cans',
      titleAr: 'علب التنر',
      subtitle: 'Kimyasal ürün ambalaj çözümleri',
      subtitleEn: 'Chemical product packaging solutions',
      subtitleAr: 'حلول تغليف المنتجات الكيميائية',
      description: 'Tiner, boya ve diğer kimyasal ürünler için dayanıklı metal ambalaj çözümleri.\n\nKimyasal dirençli iç kaplama ile güvenli saklama sağlar.',
      mainImage: '/images/products/tiner-teneke.jpg',
      gallery: JSON.stringify([]),
      features: JSON.stringify([
        'Kimyasal dirençli iç kaplama',
        'Sızdırmaz yapı',
        'Güvenli kapak sistemi',
        'Dayanıklı malzeme',
        'Farklı boyut seçenekleri'
      ]),
      tableData: JSON.stringify({
        columns: ['Kapasite', 'Malzeme'],
        rows: [
          ['1 L', 'Galvanizli Sac'],
          ['5 L', 'Galvanizli Sac'],
          ['20 L', 'Galvanizli Sac']
        ]
      }),
      ctaTitle: 'Detaylı Bilgi',
      ctaDescription: 'Kimyasal ürün ambalajları hakkında bilgi almak için bize ulaşın',
      ctaButtonText: 'İletişim',
      ctaButtonLink: '/iletisim',
      active: true
    }
  ];

  try {
    for (const pageData of productPages) {
      const existing = await prisma.productPage.findUnique({
        where: { slug: pageData.slug }
      });

      if (existing) {
        console.log(`⚠️  "${pageData.title}" already exists, skipping...`);
        continue;
      }

      await prisma.productPage.create({
        data: pageData
      });

      console.log(`✅ Created: ${pageData.title} (/${pageData.slug})`);
    }

    console.log(`\n✨ Seeding completed!`);
    console.log(`\n🎯 Next steps:`);
    console.log(`1. Visit /tr/admin/product-pages/peynir-tenekeleri to edit`);
    console.log(`2. Visit /tr/products/peynir-tenekeleri to see the page`);
    console.log(`3. Edit content from admin and see changes instantly`);

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedProductPages();
