import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function pickPublicFields(row, locale) {
  const en = locale === 'en';
  return {
    slug: row.slug,
    title: en ? row.titleEn || row.title : row.title,
    subtitle: en ? row.subtitleEn || row.subtitle : row.subtitle,
    description: en ? row.descriptionEn || row.description : row.description,
    mainImage: row.mainImage,
    content: row.content,
    detailedDescription: en
      ? row.detailedDescriptionEn || row.detailedDescription
      : row.detailedDescription,
  };
}

/** Menü + /urunler listesi (yalnızca yayında) */
router.get('/public/nav', async (req, res) => {
  try {
    const rows = await prisma.productPage.findMany({
      where: { active: true },
      orderBy: [{ order: 'asc' }, { title: 'asc' }],
      select: {
        id: true,
        slug: true,
        title: true,
        titleEn: true,
        order: true,
      },
    });
    res.json(rows);
  } catch (error) {
    console.error('Error fetching product pages nav:', error);
    res.status(500).json({ error: 'Failed to fetch product pages' });
  }
});

/** Tek ürün sayfası (yayında) — locale query: tr | en */
router.get('/public/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const locale = req.query.locale === 'en' ? 'en' : 'tr';
    const row = await prisma.productPage.findUnique({
      where: { slug },
    });
    if (!row || !row.active) {
      return res.status(404).json({ error: 'Product page not found' });
    }
    res.json(pickPublicFields(row, locale));
  } catch (error) {
    console.error('Error fetching product page:', error);
    res.status(500).json({ error: 'Failed to fetch product page' });
  }
});

/** Admin: tüm kayıtlar */
router.get('/', async (req, res) => {
  try {
    const rows = await prisma.productPage.findMany({
      orderBy: [{ order: 'asc' }, { title: 'asc' }],
    });
    res.json(rows);
  } catch (error) {
    console.error('Error fetching product pages:', error);
    res.status(500).json({ error: 'Failed to fetch product pages' });
  }
});

router.post('/', async (req, res) => {
  try {
    const body = req.body || {};
    const slug = String(body.slug || '').trim();
    const title = String(body.title || '').trim();
    if (!slug || !title) {
      return res.status(400).json({ error: 'slug ve title zorunlu' });
    }
    const data = {
      slug,
      title,
      titleEn: body.titleEn || null,
      subtitle: body.subtitle || null,
      subtitleEn: body.subtitleEn || null,
      description: body.description || null,
      descriptionEn: body.descriptionEn || null,
      detailedDescription: body.detailedDescription || null,
      detailedDescriptionEn: body.detailedDescriptionEn || null,
      mainImage: body.mainImage || null,
      content: body.content || null,
      active: body.active !== false && body.active !== 'false',
      order: Number.isFinite(Number(body.order)) ? Number(body.order) : 0,
    };
    const created = await prisma.productPage.create({ data });
    res.status(201).json(created);
  } catch (error) {
    console.error('Error creating product page:', error);
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Bu slug zaten kullanılıyor' });
    }
    res.status(500).json({ error: 'Failed to create product page' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!UUID_RE.test(id)) {
      return res.status(400).json({ error: 'Geçersiz id' });
    }
    const body = req.body || {};
    const data = {};
    const strings = [
      'slug',
      'title',
      'titleEn',
      'subtitle',
      'subtitleEn',
      'description',
      'descriptionEn',
      'detailedDescription',
      'detailedDescriptionEn',
      'mainImage',
      'content',
    ];
    for (const k of strings) {
      if (body[k] !== undefined) data[k] = body[k] === '' ? null : body[k];
    }
    if (body.order !== undefined) {
      data.order = Number.isFinite(Number(body.order)) ? Number(body.order) : 0;
    }
    if (body.active !== undefined) {
      data.active = body.active !== false && body.active !== 'false';
    }
    const updated = await prisma.productPage.update({
      where: { id },
      data,
    });
    res.json(updated);
  } catch (error) {
    console.error('Error updating product page:', error);
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Bu slug zaten kullanılıyor' });
    }
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Kayıt bulunamadı' });
    }
    res.status(500).json({ error: 'Failed to update product page' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!UUID_RE.test(id)) {
      return res.status(400).json({ error: 'Geçersiz id' });
    }
    await prisma.productPage.delete({ where: { id } });
    res.json({ ok: true });
  } catch (error) {
    console.error('Error deleting product page:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Kayıt bulunamadı' });
    }
    res.status(500).json({ error: 'Failed to delete product page' });
  }
});

export default router;
