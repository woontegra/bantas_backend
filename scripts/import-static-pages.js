import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function importPages() {
  console.log('🚀 Starting static pages import...\n');

  const pages = [
    {
      title: 'Tarihçe',
      titleEn: 'History',
      titleAr: 'التاريخ',
      slug: 'tarihce',
      template: 'timeline',
      sections: JSON.stringify([
        {
          id: '1',
          type: 'hero',
          data: {
            title: 'Tarihçemiz',
            subtitle: '1986 yılından bu yana metal ambalaj sektöründe öncü bir firma olarak faaliyet göstermekteyiz.'
          }
        },
        {
          id: '2',
          type: 'timeline',
          data: {
            events: [
              { year: '1986', description: 'Bantaş Metal Ambalaj San. ve Tic. A.Ş. kuruldu.' },
              { year: '1994', description: 'İlk ihracat gerçekleştirildi.' },
              { year: '1998', description: 'ISO 9001 Kalite Yönetim Sistemi belgesi alındı.' },
              { year: '1998', description: 'Yeni üretim tesisi faaliyete geçti.' },
              { year: '2005', description: 'Ürün gamı genişletildi, yeni ürün hatları devreye alındı.' },
              { year: '2008', description: 'Avrupa pazarına giriş yapıldı.' },
              { year: '2009', description: 'Kapasite artırımı gerçekleştirildi.' },
              { year: '2010', description: 'Yeni teknoloji yatırımları tamamlandı.' },
              { year: '2011', description: 'Ürün çeşitliliği artırıldı.' },
              { year: '2016', description: 'Sürdürülebilirlik sertifikaları alındı.' },
              { year: '2017', description: 'Ar-Ge merkezi kuruldu.' }
            ]
          }
        },
        {
          id: '3',
          type: 'cta',
          data: {
            title: 'Geleceğe Birlikte',
            description: 'Yılların deneyimi ve sürekli yenilikçi yaklaşımımızla metal ambalaj sektöründe lider konumumuzu sürdürüyoruz.',
            buttonText: 'İletişime Geçin',
            buttonLink: '/iletisim'
          }
        }
      ]),
      active: true
    },
    {
      title: 'Hakkımızda',
      titleEn: 'About Us',
      titleAr: 'معلومات عنا',
      slug: 'hakkimizda',
      template: 'default',
      sections: JSON.stringify([
        {
          id: '1',
          type: 'hero',
          data: {
            title: 'Hakkımızda',
            subtitle: 'Metal ambalaj sektöründe 35 yılı aşkın tecrübemizle kalite ve güvenin adresi'
          }
        },
        {
          id: '2',
          type: 'text',
          data: {
            heading: 'Bantaş Metal Ambalaj',
            content: `Bantaş Metal Ambalaj San. ve Tic. A.Ş., 1986 yılından bu yana metal ambalaj sektöründe faaliyet göstermektedir. 

Modern tesislerimizde, son teknoloji makineler ile üretim yaparak, müşterilerimize en kaliteli ürünleri sunmaktayız.

Gıda, kimya ve endüstriyel sektörlere yönelik geniş ürün yelpazemiz ile hizmet vermekteyiz. Kalite politikamız doğrultusunda, uluslararası standartlara uygun üretim yaparak, müşteri memnuniyetini ön planda tutmaktayız.

Sürdürülebilirlik ve çevre dostu üretim anlayışımızla, gelecek nesillere daha yaşanabilir bir dünya bırakmayı hedefliyoruz.`
          }
        },
        {
          id: '3',
          type: 'cta',
          data: {
            title: 'Ürünlerimizi Keşfedin',
            description: 'Geniş ürün yelpazemizi inceleyin ve ihtiyacınıza uygun çözümü bulun.',
            buttonText: 'Ürünler',
            buttonLink: '/urunler'
          }
        }
      ]),
      active: true
    },
    {
      title: 'Teknoloji',
      titleEn: 'Technology',
      titleAr: 'التكنولوجيا',
      slug: 'teknoloji',
      template: 'default',
      sections: JSON.stringify([
        {
          id: '1',
          type: 'hero',
          data: {
            title: 'Teknoloji ve Yenilik',
            subtitle: 'Son teknoloji makineler ve sürekli Ar-Ge çalışmalarımızla sektörde öncü konumdayız'
          }
        },
        {
          id: '2',
          type: 'text',
          data: {
            heading: 'Modern Üretim Teknolojileri',
            content: `Tesislerimizde bulunan son teknoloji makineler ile yüksek kalitede ve hızlı üretim gerçekleştirmekteyiz.

Otomatik üretim hatlarımız sayesinde, standart kalitede ve hatasız ürünler üretmekteyiz. CNC teknolojisi ile hassas kesim ve şekillendirme işlemleri yapılmaktadır.

Ar-Ge merkezimizde, yeni ürün geliştirme ve mevcut ürünlerimizi iyileştirme çalışmaları sürekli olarak devam etmektedir.

Kalite kontrol sistemlerimiz ile her üretim aşamasında detaylı kontroller yapılarak, müşterilerimize en iyi ürünleri sunmaktayız.`
          }
        }
      ]),
      active: true
    },
    {
      title: 'Kalite Belgelerimiz',
      titleEn: 'Quality Certificates',
      titleAr: 'شهادات الجودة',
      slug: 'kalite-belgelerimiz',
      template: 'default',
      sections: JSON.stringify([
        {
          id: '1',
          type: 'hero',
          data: {
            title: 'Kalite Belgelerimiz',
            subtitle: 'Uluslararası standartlara uygun üretim ve kalite yönetim sistemlerimiz'
          }
        },
        {
          id: '2',
          type: 'text',
          data: {
            heading: 'Sertifikalarımız',
            content: `ISO 9001:2015 Kalite Yönetim Sistemi
ISO 14001:2015 Çevre Yönetim Sistemi
ISO 45001:2018 İş Sağlığı ve Güvenliği Yönetim Sistemi
FSSC 22000 Gıda Güvenliği Sistemi Sertifikası
TSE Uygunluk Belgesi

Tüm üretim süreçlerimiz, uluslararası kalite standartlarına uygun olarak gerçekleştirilmektedir. Düzenli olarak yapılan denetimler ile sertifikalarımızı güncel tutmaktayız.`
          }
        }
      ]),
      active: true
    },
    {
      title: 'İnsan Kaynakları',
      titleEn: 'Human Resources',
      titleAr: 'الموارد البشرية',
      slug: 'insan-kaynaklari',
      template: 'default',
      sections: JSON.stringify([
        {
          id: '1',
          type: 'hero',
          data: {
            title: 'İnsan Kaynakları',
            subtitle: 'Ekibimize katılın, birlikte büyüyelim'
          }
        },
        {
          id: '2',
          type: 'text',
          data: {
            heading: 'Kariyer Fırsatları',
            content: `Bantaş Metal Ambalaj olarak, dinamik ve gelişime açık ekip arkadaşları arıyoruz.

Çalışanlarımıza sunduğumuz imkanlar:
- Rekabetçi maaş ve yan haklar
- Eğitim ve gelişim programları
- Kariyer planlama desteği
- Modern çalışma ortamı
- Sosyal aktiviteler

Açık pozisyonlarımız için CV'nizi ik@bantas.com.tr adresine gönderebilirsiniz.`
          }
        },
        {
          id: '3',
          type: 'cta',
          data: {
            title: 'Başvuru Yapın',
            description: 'Ekibimize katılmak için CV\'nizi gönderin',
            buttonText: 'İletişim',
            buttonLink: '/iletisim'
          }
        }
      ]),
      active: true
    },
    {
      title: 'Sosyal Sorumluluk',
      titleEn: 'Social Responsibility',
      titleAr: 'المسؤولية الاجتماعية',
      slug: 'sosyal-sorumluluk',
      template: 'default',
      sections: JSON.stringify([
        {
          id: '1',
          type: 'hero',
          data: {
            title: 'Sosyal Sorumluluk',
            subtitle: 'Topluma ve çevreye karşı sorumluluklarımız'
          }
        },
        {
          id: '2',
          type: 'text',
          data: {
            heading: 'Sürdürülebilirlik ve Çevre',
            content: `Bantaş Metal Ambalaj olarak, çevreye duyarlı üretim anlayışını benimsemiş bulunmaktayız.

Çevre Politikamız:
- Enerji verimliliği
- Atık yönetimi ve geri dönüşüm
- Su tasarrufu
- Emisyon kontrolü
- Sürdürülebilir hammadde kullanımı

Sosyal sorumluluk projelerimiz ile topluma katkı sağlamaya devam ediyoruz.`
          }
        }
      ]),
      active: true
    }
  ];

  try {
    for (const pageData of pages) {
      // Check if page already exists
      const existing = await prisma.page.findUnique({
        where: { slug: pageData.slug }
      });

      if (existing) {
        console.log(`⚠️  Page "${pageData.title}" already exists, skipping...`);
        continue;
      }

      // Create page
      await prisma.page.create({
        data: pageData
      });

      console.log(`✅ Created page: ${pageData.title} (/${pageData.slug})`);
    }

    console.log('\n✨ Import completed successfully!');
    console.log(`\nImported ${pages.length} pages. You can now:`);
    console.log('1. View them at /tr/admin/pages-cms');
    console.log('2. Edit sections from admin panel');
    console.log('3. Visit pages on website (e.g., /tr/tarihce)');
    
  } catch (error) {
    console.error('❌ Error importing pages:', error);
  } finally {
    await prisma.$disconnect();
  }
}

importPages();
