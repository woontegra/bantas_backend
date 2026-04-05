import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function migrateAllPages() {
  console.log('🚀 Starting COMPLETE page migration to CMS...\n');

  const allPages = [
    // CORPORATE PAGES
    {
      title: 'Hakkımızda',
      titleEn: 'About Us',
      titleAr: 'معلومات عنا',
      slug: 'hakkimizda',
      template: 'default',
      sections: [
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
            content: `Bantaş Metal Ambalaj San. ve Tic. A.Ş., 1986 yılından bu yana metal ambalaj sektöründe faaliyet göstermektedir.\n\nModern tesislerimizde, son teknoloji makineler ile üretim yaparak, müşterilerimize en kaliteli ürünleri sunmaktayız.\n\nGıda, kimya ve endüstriyel sektörlere yönelik geniş ürün yelpazemiz ile hizmet vermekteyiz.`
          }
        }
      ]
    },
    {
      title: 'Tarihçe',
      titleEn: 'History',
      titleAr: 'التاريخ',
      slug: 'tarihce',
      template: 'timeline',
      sections: [
        {
          id: '1',
          type: 'hero',
          data: {
            title: 'Tarihçemiz',
            subtitle: '1986 yılından bu yana metal ambalaj sektöründe öncü bir firma'
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
              { year: '2005', description: 'Ürün gamı genişletildi, yeni ürün hatları devreye alındı.' },
              { year: '2008', description: 'Avrupa pazarına giriş yapıldı.' },
              { year: '2010', description: 'Yeni teknoloji yatırımları tamamlandı.' },
              { year: '2016', description: 'Sürdürülebilirlik sertifikaları alındı.' },
              { year: '2017', description: 'Ar-Ge merkezi kuruldu.' }
            ]
          }
        }
      ]
    },
    {
      title: 'Teknoloji',
      titleEn: 'Technology',
      titleAr: 'التكنولوجيا',
      slug: 'teknoloji',
      template: 'default',
      sections: [
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
            content: `Tesislerimizde bulunan son teknoloji makineler ile yüksek kalitede ve hızlı üretim gerçekleştirmekteyiz.\n\nOtomatik üretim hatlarımız sayesinde, standart kalitede ve hatasız ürünler üretmekteyiz.\n\nAr-Ge merkezimizde, yeni ürün geliştirme ve mevcut ürünlerimizi iyileştirme çalışmaları sürekli olarak devam etmektedir.`
          }
        }
      ]
    },
    {
      title: 'Kalite Belgelerimiz',
      titleEn: 'Quality Certificates',
      titleAr: 'شهادات الجودة',
      slug: 'kalite-belgelerimiz',
      template: 'default',
      sections: [
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
            content: `ISO 9001:2015 Kalite Yönetim Sistemi\nISO 14001:2015 Çevre Yönetim Sistemi\nISO 45001:2018 İş Sağlığı ve Güvenliği Yönetim Sistemi\nFSSC 22000 Gıda Güvenliği Sistemi Sertifikası\nTSE Uygunluk Belgesi`
          }
        }
      ]
    },
    {
      title: 'İnsan Kaynakları',
      titleEn: 'Human Resources',
      titleAr: 'الموارد البشرية',
      slug: 'insan-kaynaklari',
      template: 'default',
      sections: [
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
            content: `Bantaş Metal Ambalaj olarak, dinamik ve gelişime açık ekip arkadaşları arıyoruz.\n\nÇalışanlarımıza sunduğumuz imkanlar:\n- Rekabetçi maaş ve yan haklar\n- Eğitim ve gelişim programları\n- Kariyer planlama desteği\n- Modern çalışma ortamı`
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
      ]
    },
    {
      title: 'Sosyal Sorumluluk',
      titleEn: 'Social Responsibility',
      titleAr: 'المسؤولية الاجتماعية',
      slug: 'sosyal-sorumluluk',
      template: 'default',
      sections: [
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
            content: `Bantaş Metal Ambalaj olarak, çevreye duyarlı üretim anlayışını benimsemiş bulunmaktayız.\n\nÇevre Politikamız:\n- Enerji verimliliği\n- Atık yönetimi ve geri dönüşüm\n- Su tasarrufu\n- Emisyon kontrolü`
          }
        }
      ]
    },

    // POLICY PAGES (with sidebar)
    {
      title: 'Kalite Politikası',
      titleEn: 'Quality Policy',
      titleAr: 'سياسة الجودة',
      slug: 'hakkimizda/politikalarimiz/kalite',
      template: 'sidebar',
      sections: [
        {
          id: '1',
          type: 'sidebar-content',
          data: {
            sidebar: {
              title: 'Politikalarımız',
              links: [
                { label: 'Kalite Politikası', url: '/tr/hakkimizda/politikalarimiz/kalite' },
                { label: 'Gıda Güvenliği', url: '/tr/hakkimizda/politikalarimiz/gida-guvenligi' },
                { label: 'İş Sağlığı ve Güvenliği', url: '/tr/hakkimizda/politikalarimiz/is-sagligi' },
                { label: 'Bilgi Güvenliği', url: '/tr/hakkimizda/politikalarimiz/bilgi-guvenligi' },
                { label: 'İK Politikası', url: '/tr/hakkimizda/politikalarimiz/ik-politikasi' },
                { label: 'KVKK', url: '/tr/hakkimizda/politikalarimiz/kvkk' }
              ]
            },
            title: 'Kalite Politikası',
            content: `Müşteri memnuniyetini esas alarak, kaliteli ürün ve hizmet sunmak.\n\nUluslararası standartlara uygun üretim yapmak.\n\nSürekli iyileştirme anlayışı ile çalışmak.`
          }
        }
      ]
    },
    {
      title: 'Gıda Güvenliği Politikası',
      titleEn: 'Food Safety Policy',
      titleAr: 'سياسة سلامة الغذاء',
      slug: 'hakkimizda/politikalarimiz/gida-guvenligi',
      template: 'sidebar',
      sections: [
        {
          id: '1',
          type: 'sidebar-content',
          data: {
            sidebar: {
              title: 'Politikalarımız',
              links: [
                { label: 'Kalite Politikası', url: '/tr/hakkimizda/politikalarimiz/kalite' },
                { label: 'Gıda Güvenliği', url: '/tr/hakkimizda/politikalarimiz/gida-guvenligi' },
                { label: 'İş Sağlığı ve Güvenliği', url: '/tr/hakkimizda/politikalarimiz/is-sagligi' },
                { label: 'Bilgi Güvenliği', url: '/tr/hakkimizda/politikalarimiz/bilgi-guvenligi' },
                { label: 'İK Politikası', url: '/tr/hakkimizda/politikalarimiz/ik-politikasi' },
                { label: 'KVKK', url: '/tr/hakkimizda/politikalarimiz/kvkk' }
              ]
            },
            title: 'Gıda Güvenliği Politikası',
            content: `Gıda güvenliği standartlarına tam uyum sağlamak.\n\nFSSC 22000 standardı gerekliliklerini yerine getirmek.\n\nGıda ile temas eden ürünlerde en yüksek hijyen standartlarını uygulamak.`
          }
        }
      ]
    },
    {
      title: 'İş Sağlığı ve Güvenliği Politikası',
      titleEn: 'OHS Policy',
      titleAr: 'سياسة الصحة والسلامة المهنية',
      slug: 'hakkimizda/politikalarimiz/is-sagligi',
      template: 'sidebar',
      sections: [
        {
          id: '1',
          type: 'sidebar-content',
          data: {
            sidebar: {
              title: 'Politikalarımız',
              links: [
                { label: 'Kalite Politikası', url: '/tr/hakkimizda/politikalarimiz/kalite' },
                { label: 'Gıda Güvenliği', url: '/tr/hakkimizda/politikalarimiz/gida-guvenligi' },
                { label: 'İş Sağlığı ve Güvenliği', url: '/tr/hakkimizda/politikalarimiz/is-sagligi' },
                { label: 'Bilgi Güvenliği', url: '/tr/hakkimizda/politikalarimiz/bilgi-guvenligi' },
                { label: 'İK Politikası', url: '/tr/hakkimizda/politikalarimiz/ik-politikasi' },
                { label: 'KVKK', url: '/tr/hakkimizda/politikalarimiz/kvkk' }
              ]
            },
            title: 'İş Sağlığı ve Güvenliği Politikası',
            content: `Çalışanlarımızın sağlığını ve güvenliğini en üst düzeyde korumak.\n\nİş kazalarını ve meslek hastalıklarını önlemek.\n\nGüvenli çalışma ortamı sağlamak.`
          }
        }
      ]
    },
    {
      title: 'Bilgi Güvenliği Politikası',
      titleEn: 'Information Security Policy',
      titleAr: 'سياسة أمن المعلومات',
      slug: 'hakkimizda/politikalarimiz/bilgi-guvenligi',
      template: 'sidebar',
      sections: [
        {
          id: '1',
          type: 'sidebar-content',
          data: {
            sidebar: {
              title: 'Politikalarımız',
              links: [
                { label: 'Kalite Politikası', url: '/tr/hakkimizda/politikalarimiz/kalite' },
                { label: 'Gıda Güvenliği', url: '/tr/hakkimizda/politikalarimiz/gida-guvenligi' },
                { label: 'İş Sağlığı ve Güvenliği', url: '/tr/hakkimizda/politikalarimiz/is-sagligi' },
                { label: 'Bilgi Güvenliği', url: '/tr/hakkimizda/politikalarimiz/bilgi-guvenligi' },
                { label: 'İK Politikası', url: '/tr/hakkimizda/politikalarimiz/ik-politikasi' },
                { label: 'KVKK', url: '/tr/hakkimizda/politikalarimiz/kvkk' }
              ]
            },
            title: 'Bilgi Güvenliği Politikası',
            content: `Bilgi varlıklarının gizliliğini, bütünlüğünü ve erişilebilirliğini korumak.\n\nSiber güvenlik tedbirlerini almak.\n\nVeri güvenliği standartlarına uymak.`
          }
        }
      ]
    },
    {
      title: 'İnsan Kaynakları Politikası',
      titleEn: 'HR Policy',
      titleAr: 'سياسة الموارد البشرية',
      slug: 'hakkimizda/politikalarimiz/ik-politikasi',
      template: 'sidebar',
      sections: [
        {
          id: '1',
          type: 'sidebar-content',
          data: {
            sidebar: {
              title: 'Politikalarımız',
              links: [
                { label: 'Kalite Politikası', url: '/tr/hakkimizda/politikalarimiz/kalite' },
                { label: 'Gıda Güvenliği', url: '/tr/hakkimizda/politikalarimiz/gida-guvenligi' },
                { label: 'İş Sağlığı ve Güvenliği', url: '/tr/hakkimizda/politikalarimiz/is-sagligi' },
                { label: 'Bilgi Güvenliği', url: '/tr/hakkimizda/politikalarimiz/bilgi-guvenligi' },
                { label: 'İK Politikası', url: '/tr/hakkimizda/politikalarimiz/ik-politikasi' },
                { label: 'KVKK', url: '/tr/hakkimizda/politikalarimiz/kvkk' }
              ]
            },
            title: 'İnsan Kaynakları Politikası',
            content: `Çalışanlarımızın gelişimini desteklemek.\n\nAdil ve eşit çalışma ortamı sağlamak.\n\nPerformans odaklı yönetim anlayışı benimsemek.`
          }
        }
      ]
    },
    {
      title: 'KVKK Aydınlatma Metni',
      titleEn: 'GDPR Information',
      titleAr: 'معلومات حماية البيانات',
      slug: 'hakkimizda/politikalarimiz/kvkk',
      template: 'sidebar',
      sections: [
        {
          id: '1',
          type: 'sidebar-content',
          data: {
            sidebar: {
              title: 'Politikalarımız',
              links: [
                { label: 'Kalite Politikası', url: '/tr/hakkimizda/politikalarimiz/kalite' },
                { label: 'Gıda Güvenliği', url: '/tr/hakkimizda/politikalarimiz/gida-guvenligi' },
                { label: 'İş Sağlığı ve Güvenliği', url: '/tr/hakkimizda/politikalarimiz/is-sagligi' },
                { label: 'Bilgi Güvenliği', url: '/tr/hakkimizda/politikalarimiz/bilgi-guvenligi' },
                { label: 'İK Politikası', url: '/tr/hakkimizda/politikalarimiz/ik-politikasi' },
                { label: 'KVKK', url: '/tr/hakkimizda/politikalarimiz/kvkk' }
              ]
            },
            title: 'KVKK Aydınlatma Metni',
            content: `6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında kişisel verileriniz korunmaktadır.\n\nVerileriniz yasal çerçevede işlenmekte ve saklanmaktadır.\n\nHaklarınız konusunda bilgi almak için bizimle iletişime geçebilirsiniz.`
          }
        }
      ]
    },

    // CONTACT PAGE
    {
      title: 'İletişim',
      titleEn: 'Contact',
      titleAr: 'اتصل بنا',
      slug: 'iletisim',
      template: 'contact',
      sections: [
        {
          id: '1',
          type: 'hero',
          data: {
            title: 'İletişim',
            subtitle: 'Bizimle iletişime geçin'
          }
        },
        {
          id: '2',
          type: 'contact-form',
          data: {
            title: 'Mesaj Gönderin'
          }
        },
        {
          id: '3',
          type: 'two-column',
          data: {
            left: {
              title: 'Adres',
              content: 'Organize Sanayi Bölgesi\n1. Cadde No: 123\n16000 Bursa / Türkiye'
            },
            right: {
              title: 'İletişim Bilgileri',
              content: 'Tel: +90 224 XXX XX XX\nFax: +90 224 XXX XX XX\nE-posta: info@bantas.com.tr'
            }
          }
        }
      ]
    },

    // PRODUCT PAGES
    {
      title: 'Peynir Tenekeleri',
      titleEn: 'Cheese Cans',
      titleAr: 'علب الجبن',
      slug: 'peynir-tenekeleri',
      template: 'product',
      sections: [
        {
          id: '1',
          type: 'hero',
          data: {
            title: 'Peynir Tenekeleri',
            subtitle: 'Gıda ambalaj çözümleri'
          }
        },
        {
          id: '2',
          type: 'text',
          data: {
            heading: 'Ürün Özellikleri',
            content: `Gıda ile temas eden yüzeylerde kullanıma uygun\nFarklı boyut seçenekleri\nHijyenik üretim\nUzun ömürlü kullanım`
          }
        },
        {
          id: '3',
          type: 'cta',
          data: {
            title: 'Fiyat Teklifi Alın',
            description: 'Ürünlerimiz hakkında detaylı bilgi ve fiyat teklifi için bizimle iletişime geçin',
            buttonText: 'İletişim',
            buttonLink: '/iletisim'
          }
        }
      ]
    },

    // GALLERY PAGE
    {
      title: 'Galeri',
      titleEn: 'Gallery',
      titleAr: 'معرض الصور',
      slug: 'galeri',
      template: 'gallery',
      sections: [
        {
          id: '1',
          type: 'hero',
          data: {
            title: 'Galeri',
            subtitle: 'Tesislerimiz ve ürünlerimizden görüntüler'
          }
        },
        {
          id: '2',
          type: 'gallery-grid',
          data: {
            images: []
          }
        }
      ]
    },

    // NEWS PAGE
    {
      title: 'Haberler',
      titleEn: 'News',
      titleAr: 'أخبار',
      slug: 'haberler',
      template: 'news',
      sections: [
        {
          id: '1',
          type: 'hero',
          data: {
            title: 'Haberler',
            subtitle: 'Şirket haberlerimiz ve duyurularımız'
          }
        },
        {
          id: '2',
          type: 'news-list',
          data: {}
        }
      ]
    }
  ];

  try {
    let created = 0;
    let skipped = 0;

    for (const pageData of allPages) {
      const existing = await prisma.page.findUnique({
        where: { slug: pageData.slug }
      });

      if (existing) {
        console.log(`⚠️  Page "${pageData.title}" (${pageData.slug}) already exists, skipping...`);
        skipped++;
        continue;
      }

      await prisma.page.create({
        data: {
          ...pageData,
          sections: JSON.stringify(pageData.sections)
        }
      });

      console.log(`✅ Created: ${pageData.title} (/${pageData.slug})`);
      created++;
    }

    console.log(`\n✨ Migration completed!`);
    console.log(`📊 Summary:`);
    console.log(`   - Created: ${created} pages`);
    console.log(`   - Skipped: ${skipped} pages (already exist)`);
    console.log(`   - Total: ${allPages.length} pages processed`);
    console.log(`\n🎯 Next steps:`);
    console.log(`1. Visit /tr/admin/pages-cms to see all pages`);
    console.log(`2. Edit any page to customize sections`);
    console.log(`3. All pages now render from CMS dynamically`);
    console.log(`4. Remove hardcoded page files (optional)`);

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

migrateAllPages();
