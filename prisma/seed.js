import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.adminUser.upsert({
    where: { email: 'admin@bantas.com' },
    update: {},
    create: {
      email: 'admin@bantas.com',
      password: hashedPassword,
      name: 'Admin',
      role: 'admin',
    },
  });
  console.log('✅ Admin user created:', admin.email);

  // Create product categories
  const productCategories = [
    { name: 'Fabrika', nameEn: 'Factory', nameAr: 'المصنع', order: 1, active: true },
    { name: 'Ürün', nameEn: 'Product', nameAr: 'المنتج', order: 2, active: true },
    { name: 'Etkinlikler', nameEn: 'Events', nameAr: 'الفعاليات', order: 3, active: true },
    { name: 'Sertifikalar', nameEn: 'Certificates', nameAr: 'الشهادات', order: 4, active: true },
  ];

  // Check if categories already exist
  const existingCategories = await prisma.productCategory.count();
  if (existingCategories === 0) {
    for (const cat of productCategories) {
      await prisma.productCategory.create({
        data: cat,
      });
    }
    console.log('✅ Product categories created');
  } else {
    console.log('ℹ️ Product categories already exist, skipping...');
  }

  // Create menu categories
  const categories = [
    { title: 'Tarihçe', titleEn: 'History', titleAr: 'التاريخ', slug: 'tarihce', icon: 'History', order: 1 },
    { title: 'Teknoloji', titleEn: 'Technology', titleAr: 'التكنولوجيا', slug: 'teknoloji', icon: 'Cpu', order: 2 },
    { title: 'Kalite Belgelerimiz', titleEn: 'Quality Certificates', titleAr: 'شهادات الجودة', slug: 'kalite', icon: 'FileText', order: 3 },
    { title: 'Politikalarımız', titleEn: 'Our Policies', titleAr: 'سياساتنا', slug: 'politikalar', icon: 'FileText', order: 4 },
    { title: 'İnsan Kaynakları', titleEn: 'Human Resources', titleAr: 'الموارد البشرية', slug: 'ik', icon: 'Users', order: 5 },
    { title: 'Sosyal Sorumluluk', titleEn: 'Social Responsibility', titleAr: 'المسؤولية الاجتماعية', slug: 'sosyal', icon: 'Heart', order: 6 },
    { title: 'Sürdürülebilirlik İlkelerimiz', titleEn: 'Sustainability Principles', titleAr: 'مبادئ الاستدامة', slug: 'surdurulebilirlik', icon: 'Leaf', order: 7 },
  ];

  for (const cat of categories) {
    await prisma.menuCategory.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }
  console.log('✅ Menu categories created');

  // Create menu items for Politikalarımız
  const politikalarCategory = await prisma.menuCategory.findUnique({
    where: { slug: 'politikalar' },
  });

  if (politikalarCategory) {
    const items = [
      { 
        title: 'Bilgi Güvenliği Politikası', 
        titleEn: 'Information Security Policy',
        titleAr: 'سياسة أمن المعلومات',
        slug: 'bilgi-guvenlik', 
        link: '/politikalar/bilgi-guvenlik', 
        order: 1 
      },
      { 
        title: 'Gıda Güvenliği Politikası', 
        titleEn: 'Food Safety Policy',
        titleAr: 'سياسة سلامة الغذاء',
        slug: 'gida-guvenlik', 
        link: '/politikalar/gida-guvenlik', 
        order: 2 
      },
      { 
        title: 'İnsan Kaynakları Politikası', 
        titleEn: 'Human Resources Policy',
        titleAr: 'سياسة الموارد البشرية',
        slug: 'ik-politika', 
        link: '/politikalar/ik-politika', 
        order: 3 
      },
      { 
        title: 'İş Sağlığı Güvenliği Politikası', 
        titleEn: 'Occupational Health and Safety Policy',
        titleAr: 'سياسة الصحة والسلامة المهنية',
        slug: 'is-sagligi', 
        link: '/politikalar/is-sagligi', 
        order: 4 
      },
      { 
        title: 'Kalite Politikası', 
        titleEn: 'Quality Policy',
        titleAr: 'سياسة الجودة',
        slug: 'kalite-politika', 
        link: '/politikalar/kalite-politika', 
        order: 5 
      },
      { 
        title: 'Kişisel Veri Saklama ve İmha Politikası', 
        titleEn: 'Personal Data Storage and Disposal Policy',
        titleAr: 'سياسة تخزين البيانات الشخصية والتخلص منها',
        slug: 'veri-saklama', 
        link: '/politikalar/veri-saklama', 
        order: 6 
      },
      { 
        title: 'Kişisel Verilerin Korunması ve İşlenmesi Politikası', 
        titleEn: 'Personal Data Protection and Processing Policy',
        titleAr: 'سياسة حماية ومعالجة البيانات الشخصية',
        slug: 'kvkk-islenme', 
        link: '/politikalar/kvkk-islenme', 
        order: 7 
      },
      { 
        title: 'Web Sitesi Aydınlatma Politikası', 
        titleEn: 'Website Privacy Policy',
        titleAr: 'سياسة خصوصية الموقع',
        slug: 'aydinlatma', 
        link: '/politikalar/aydinlatma', 
        order: 8 
      },
      { 
        title: 'KVKK – Başvuru Formu', 
        titleEn: 'GDPR - Application Form',
        titleAr: 'نموذج طلب حماية البيانات',
        slug: 'kvkk-basvuru', 
        link: '/politikalar/kvkk-basvuru', 
        order: 9 
      },
    ];

    for (const item of items) {
      await prisma.menuItem.create({
        data: {
          ...item,
          categoryId: politikalarCategory.id,
        },
      });
    }
    console.log('✅ Menu items created for Politikalarımız');
  }

  // Create featured content
  await prisma.featuredContent.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      title: '30+ yıllık',
      titleEn: '30+ years of',
      titleAr: '30+ سنة من',
      description: 'üretim tecrübesi',
      descriptionEn: 'production experience',
      descriptionAr: 'خبرة الإنتاج',
      buttonText: 'Detayları İncele',
      buttonTextEn: 'Learn More',
      buttonTextAr: 'اعرف المزيد',
      buttonLink: '/hakkimizda',
    },
  });
  console.log('✅ Featured content created');

  // Create management board featured image
  await prisma.galleryFeatured.upsert({
    where: { id: 'management-board-default' },
    update: {},
    create: {
      id: 'management-board-default',
      type: 'management_board',
      image: '/uploads/yonetim-kurulu.jpg',
      title: 'Bantaş A.Ş. Yönetim Kurulu',
      titleEn: 'Bantaş A.Ş. Board of Directors',
      titleAr: 'مجلس إدارة بانتاش',
      description: '(Soldan Sağa) Muammer BİRAV – Adnan ERDAN – Fikret ÇETİN',
      descriptionEn: '(Left to Right) Muammer BİRAV – Adnan ERDAN – Fikret ÇETİN',
      descriptionAr: '(من اليسار إلى اليمين) معمر بيراف - عدنان إردان - فكرت شتين',
      active: true,
    },
  });
  console.log('✅ Management board featured image created');

  // Create home product categories
  const homeProductCategories = [
    { 
      name: 'Zeytin Tenekeleri', 
      nameEn: 'Olive Cans', 
      nameAr: 'علب الزيتون',
      link: '/zeytin-tursu-tenekeleri',
      description: 'Geniş ürün yelpazemizle ihtiyaçlarınıza özel çözümler sunuyoruz',
      descriptionEn: 'We offer customized solutions for your needs with our wide product range',
      descriptionAr: 'نقدم حلولاً مخصصة لاحتياجاتك مع مجموعة منتجاتنا الواسعة',
      order: 1, 
      active: true 
    },
    { 
      name: 'Peynir Tenekeleri', 
      nameEn: 'Cheese Cans', 
      nameAr: 'علب الجبن',
      link: '/peynir-tenekeleri',
      description: 'Geniş ürün yelpazemizle ihtiyaçlarınıza özel çözümler sunuyoruz',
      descriptionEn: 'We offer customized solutions for your needs with our wide product range',
      descriptionAr: 'نقدم حلولاً مخصصة لاحتياجاتك مع مجموعة منتجاتنا الواسعة',
      order: 2, 
      active: true 
    },
    { 
      name: 'Yağ Tenekeleri', 
      nameEn: 'Oil Cans', 
      nameAr: 'علب الزيت',
      link: '/yag-tenekeleri',
      description: 'Geniş ürün yelpazemizle ihtiyaçlarınıza özel çözümler sunuyoruz',
      descriptionEn: 'We offer customized solutions for your needs with our wide product range',
      descriptionAr: 'نقدم حلولاً مخصصة لاحتياجاتك مع مجموعة منتجاتنا الواسعة',
      order: 3, 
      active: true 
    },
    { 
      name: 'Diğer Tenekeler', 
      nameEn: 'Other Cans', 
      nameAr: 'علب أخرى',
      link: '/tiner-antifriz-madeni-yag-tenekeleri',
      description: 'Geniş ürün yelpazemizle ihtiyaçlarınıza özel çözümler sunuyoruz',
      descriptionEn: 'We offer customized solutions for your needs with our wide product range',
      descriptionAr: 'نقدم حلولاً مخصصة لاحتياجاتك مع مجموعة منتجاتنا الواسعة',
      order: 4, 
      active: true 
    },
  ];

  const existingHomeCategories = await prisma.homeProductCategory.count();
  if (existingHomeCategories === 0) {
    for (const cat of homeProductCategories) {
      await prisma.homeProductCategory.create({
        data: cat,
      });
    }
    console.log('✅ Home product categories created');
  } else {
    console.log('ℹ️ Home product categories already exist, skipping...');
  }

  console.log('🎉 Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
