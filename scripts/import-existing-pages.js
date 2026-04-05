import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function importExistingPages() {
  console.log('📦 Mevcut sayfa içeriklerini veritabanına aktarıyorum...\n');

  const pages = [
    {
      slug: 'peynir-tenekeleri',
      title: 'Peynir Tenekeleri',
      titleEn: 'Cheese Cans',
      titleAr: 'علب الجبن',
      subtitle: 'Gıda Ambalaj Çözümleri',
      subtitleEn: 'Food Packaging Solutions',
      subtitleAr: 'حلول تغليف الطعام',
      description: 'Yüksek kaliteli metal ambalaj çözümlerimiz ile peynir ürünlerinizi güvenle saklayın. Gıda ile temas eden yüzeylerde kullanıma uygun, hijyenik üretim standartlarına sahip peynir tenekelerimiz, ürünlerinizin tazeliğini ve kalitesini korur.',
      descriptionEn: 'Store your cheese products safely with our high-quality metal packaging solutions. Our cheese cans, suitable for use on food contact surfaces and with hygienic production standards, preserve the freshness and quality of your products.',
      descriptionAr: 'قم بتخزين منتجات الجبن الخاصة بك بأمان مع حلول التعبئة المعدنية عالية الجودة.',
      detailedDescription: 'Peynir ve süt ürünlerinizin tazeliğini uzun süre korumak için özel olarak tasarlanmış tenekelerimiz, gıda güvenliği standartlarına uygun üretilmektedir.\n\nİçerisinde saklanacak ürünün tazeliğini ve kalitesini korumak amacıyla peynir tenekelerimiz, cinsi ve türü ne olursa olsun tüm peynir çeşitleri için uygundur.\n\nFarklı boyut kapasitelerinde üretim yaparak, 220 gr\'dan 18 kg\'a kadar geniş bir ürün yelpazesi sunuyoruz.',
      detailedDescriptionEn: 'Our cans, specially designed to preserve the freshness of your cheese and dairy products for a long time, are produced in accordance with food safety standards.\n\nOur cheese cans are suitable for all types of cheese, regardless of type, to preserve the freshness and quality of the product to be stored.\n\nBy producing in different size capacities, we offer a wide product range from 220 gr to 18 kg.',
      detailedDescriptionAr: 'علبنا المصممة خصيصًا للحفاظ على نضارة منتجات الجبن ومنتجات الألبان لفترة طويلة، يتم إنتاجها وفقًا لمعايير سلامة الأغذية.',
      mainImage: '/images/products/peynir-teneke.jpg',
      gallery: JSON.stringify([]),
      sidebarItems: JSON.stringify([
        { label: 'Peynir Tenekeleri', url: '/tr/peynir-tenekeleri' },
        { label: 'Yağ Tenekeleri', url: '/tr/yag-tenekeleri' },
        { label: 'Zeytin Turşu Tenekeleri', url: '/tr/zeytin-tursu-tenekeleri' },
        { label: 'Tiner Antifriz Tenekeleri', url: '/tr/tiner-antifriz-madeni-yag-tenekeleri' }
      ]),
      features: JSON.stringify([
        'Gıda ile temas eden yüzeylerde kullanıma uygun',
        'Hijyenik üretim standartları',
        'Farklı boyut seçenekleri',
        'Uzun ömürlü kullanım',
        'Hava geçirmez kapak sistemi'
      ]),
      featuresEn: JSON.stringify([
        'Suitable for food contact surfaces',
        'Hygienic production standards',
        'Different size options',
        'Long-lasting use',
        'Airtight lid system'
      ]),
      featuresAr: JSON.stringify([
        'مناسب للأسطح الملامسة للطعام',
        'معايير الإنتاج الصحية',
        'خيارات حجم مختلفة',
        'استخدام طويل الأمد',
        'نظام غطاء محكم'
      ]),
      featureCards: JSON.stringify([
        { icon: '🔒', title: 'Güvenli Saklama', description: 'Hava geçirmez kapak sistemi ile ürünleriniz güvende' },
        { icon: '♻️', title: 'Geri Dönüşümlü', description: '100% geri dönüştürülebilir malzeme' },
        { icon: '✨', title: 'Hijyenik', description: 'Gıda standartlarına uygun üretim' },
        { icon: '📏', title: 'Farklı Boyutlar', description: '5kg, 10kg, 18kg seçenekleri' }
      ]),
      featureCardsEn: JSON.stringify([
        { icon: '🔒', title: 'Safe Storage', description: 'Your products are safe with airtight lid system' },
        { icon: '♻️', title: 'Recyclable', description: '100% recyclable material' },
        { icon: '✨', title: 'Hygienic', description: 'Production according to food standards' },
        { icon: '📏', title: 'Different Sizes', description: '5kg, 10kg, 18kg options' }
      ]),
      featureCardsAr: JSON.stringify([
        { icon: '🔒', title: 'تخزين آمن', description: 'منتجاتك آمنة مع نظام غطاء محكم' },
        { icon: '♻️', title: 'قابل لإعادة التدوير', description: 'مادة قابلة لإعادة التدوير 100٪' },
        { icon: '✨', title: 'صحي', description: 'الإنتاج وفقا لمعايير الغذاء' },
        { icon: '📏', title: 'أحجام مختلفة', description: 'خيارات 5 كجم، 10 كجم، 18 كجم' }
      ]),
      multipleTables: JSON.stringify([
        {
          title: 'Yuvarlak Tenekeler - Teknik Özellikler',
          columns: ['Kapasite', 'Çap (mm)', 'Yükseklik (mm)', 'Ağırlık (gr)'],
          rows: [
            ['5 kg', '180', '150', '250'],
            ['10 kg', '240', '180', '380'],
            ['18 kg', '300', '220', '520']
          ]
        },
        {
          title: 'Dikdörtgen Tenekeler - Teknik Özellikler',
          columns: ['Kapasite', 'En (mm)', 'Boy (mm)', 'Yükseklik (mm)'],
          rows: [
            ['5 kg', '150', '200', '140'],
            ['10 kg', '180', '250', '160'],
            ['18 kg', '220', '300', '200']
          ]
        }
      ]),
      multipleTablesEn: JSON.stringify([
        {
          title: 'Round Cans - Technical Specifications',
          columns: ['Capacity', 'Diameter (mm)', 'Height (mm)', 'Weight (gr)'],
          rows: [
            ['5 kg', '180', '150', '250'],
            ['10 kg', '240', '180', '380'],
            ['18 kg', '300', '220', '520']
          ]
        }
      ]),
      multipleTablesAr: JSON.stringify([]),
      ctaTitle: 'Fiyat Teklifi Alın',
      ctaTitleEn: 'Get a Quote',
      ctaTitleAr: 'احصل على عرض أسعار',
      ctaDescription: 'Ürünlerimiz hakkında detaylı bilgi ve özel fiyat teklifi için bizimle iletişime geçin',
      ctaDescriptionEn: 'Contact us for detailed information and special price quote about our products',
      ctaDescriptionAr: 'اتصل بنا للحصول على معلومات مفصلة وعرض أسعار خاص',
      ctaButtonText: 'İletişime Geç',
      ctaButtonTextEn: 'Contact Us',
      ctaButtonTextAr: 'اتصل بنا',
      ctaButtonLink: '/iletisim',
      active: true
    },
    {
      slug: 'yag-tenekeleri',
      title: 'Yağ Tenekeleri',
      titleEn: 'Oil Cans',
      titleAr: 'علب الزيت',
      subtitle: 'Sıvı Yağ Ambalaj Çözümleri',
      subtitleEn: 'Liquid Oil Packaging Solutions',
      description: 'Zeytinyağı, ayçiçek yağı ve diğer sıvı yağlar için özel olarak tasarlanmış metal tenekelerimiz.',
      mainImage: '/images/products/yag-teneke.jpg',
      gallery: JSON.stringify([]),
      sidebarItems: JSON.stringify([
        { label: 'Peynir Tenekeleri', url: '/tr/peynir-tenekeleri' },
        { label: 'Yağ Tenekeleri', url: '/tr/yag-tenekeleri' },
        { label: 'Zeytin Turşu Tenekeleri', url: '/tr/zeytin-tursu-tenekeleri' },
        { label: 'Tiner Antifriz Tenekeleri', url: '/tr/tiner-antifriz-madeni-yag-tenekeleri' }
      ]),
      features: JSON.stringify([
        'Sızdırmaz yapı',
        'Işık geçirmez malzeme',
        'Kolay dökme ağzı',
        'Farklı kapasite seçenekleri'
      ]),
      featureCards: JSON.stringify([]),
      multipleTables: JSON.stringify([
        {
          title: 'Teknik Özellikler',
          columns: ['Kapasite', 'Çap (mm)', 'Yükseklik (mm)'],
          rows: [
            ['5 L', '180', '250'],
            ['10 L', '220', '300'],
            ['18 L', '280', '350']
          ]
        }
      ]),
      ctaTitle: 'Fiyat Teklifi Alın',
      ctaDescription: 'Yağ tenekelerimiz hakkında detaylı bilgi için iletişime geçin',
      ctaButtonText: 'İletişime Geç',
      ctaButtonLink: '/iletisim',
      active: true
    },
    {
      slug: 'zeytin-tursu-tenekeleri',
      title: 'Zeytin Turşu Tenekeleri',
      titleEn: 'Olive Pickle Cans',
      subtitle: 'Salamura Ürün Ambalajı',
      description: 'Zeytin, turşu ve salamura ürünler için özel olarak tasarlanmış metal tenekelerimiz.',
      mainImage: '/images/products/zeytin-teneke.jpg',
      gallery: JSON.stringify([]),
      sidebarItems: JSON.stringify([
        { label: 'Peynir Tenekeleri', url: '/tr/peynir-tenekeleri' },
        { label: 'Yağ Tenekeleri', url: '/tr/yag-tenekeleri' },
        { label: 'Zeytin Turşu Tenekeleri', url: '/tr/zeytin-tursu-tenekeleri' },
        { label: 'Tiner Antifriz Tenekeleri', url: '/tr/tiner-antifriz-madeni-yag-tenekeleri' }
      ]),
      features: JSON.stringify([
        'Korozyon dirençli iç kaplama',
        'Sızdırmaz yapı',
        'Gıda standartlarına uygun',
        'Uzun ömürlü saklama'
      ]),
      featureCards: JSON.stringify([]),
      multipleTables: JSON.stringify([]),
      ctaTitle: 'Fiyat Teklifi Alın',
      ctaDescription: 'Ürünlerimiz hakkında bilgi almak için bize ulaşın',
      ctaButtonText: 'İletişime Geç',
      ctaButtonLink: '/iletisim',
      active: true
    },
    {
      slug: 'tiner-antifriz-madeni-yag-tenekeleri',
      title: 'Tiner Antifriz Madeni Yağ Tenekeleri',
      titleEn: 'Thinner Antifreeze Oil Cans',
      subtitle: 'Kimyasal Ürün Ambalajı',
      description: 'Tiner, antifriz, madeni yağ ve diğer kimyasal ürünler için dayanıklı metal ambalaj.',
      mainImage: '/images/products/tiner-teneke.jpg',
      gallery: JSON.stringify([]),
      sidebarItems: JSON.stringify([
        { label: 'Peynir Tenekeleri', url: '/tr/peynir-tenekeleri' },
        { label: 'Yağ Tenekeleri', url: '/tr/yag-tenekeleri' },
        { label: 'Zeytin Turşu Tenekeleri', url: '/tr/zeytin-tursu-tenekeleri' },
        { label: 'Tiner Antifriz Tenekeleri', url: '/tr/tiner-antifriz-madeni-yag-tenekeleri' }
      ]),
      features: JSON.stringify([
        'Kimyasal dirençli iç kaplama',
        'Sızdırmaz yapı',
        'Güvenli kapak sistemi',
        'Dayanıklı malzeme'
      ]),
      featureCards: JSON.stringify([]),
      multipleTables: JSON.stringify([]),
      ctaTitle: 'Detaylı Bilgi',
      ctaDescription: 'Kimyasal ürün ambalajları hakkında bilgi almak için bize ulaşın',
      ctaButtonText: 'İletişime Geç',
      ctaButtonLink: '/iletisim',
      active: true
    }
  ];

  try {
    for (const pageData of pages) {
      const existing = await prisma.productPage.findUnique({
        where: { slug: pageData.slug }
      });

      if (existing) {
        console.log(`⚠️  "${pageData.title}" zaten var, güncelleniyor...`);
        await prisma.productPage.update({
          where: { slug: pageData.slug },
          data: pageData
        });
        console.log(`✅ Güncellendi: ${pageData.title}`);
      } else {
        await prisma.productPage.create({
          data: pageData
        });
        console.log(`✅ Oluşturuldu: ${pageData.title}`);
      }
    }

    console.log(`\n✨ Tüm sayfalar veritabanına aktarıldı!`);
    console.log(`\n🎯 Şimdi yapabilecekleriniz:`);
    console.log(`1. Admin panele gidin: /tr/admin/pages`);
    console.log(`2. Herhangi bir sayfayı düzenleyin`);
    console.log(`3. Değişiklikler anında yansıyacak`);

  } catch (error) {
    console.error('❌ Hata:', error);
  } finally {
    await prisma.$disconnect();
  }
}

importExistingPages();
