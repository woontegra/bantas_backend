import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sliderUploadDir = path.join(__dirname, '../../uploads/hero-slider');
const sliderStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(sliderUploadDir)) {
      fs.mkdirSync(sliderUploadDir, { recursive: true });
    }
    cb(null, sliderUploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || '.jpg';
    cb(null, `hero-${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  },
});
const sliderUpload = multer({ storage: sliderStorage });

function parseBool(v) {
  return v === 'true' || v === true;
}

// ===== HERO IMAGES (sabit path'ler önce) =====
router.get('/images', async (req, res) => {
  try {
    const images = await prisma.heroImage.findMany({
      orderBy: { position: 'asc' },
    });
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/position/:position', async (req, res) => {
  try {
    const image = await prisma.heroImage.findUnique({
      where: { position: req.params.position },
    });

    if (!image) {
      return res.status(404).json({ error: 'Hero image not found' });
    }

    res.json(image);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===== HERO CONTENT (/:id'den önce) =====
router.get('/content', async (req, res) => {
  try {
    const content = await prisma.heroContent.findMany();
    res.json(content[0] || null);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/content', async (req, res) => {
  try {
    const existing = await prisma.heroContent.findFirst();

    if (existing) {
      const content = await prisma.heroContent.update({
        where: { id: existing.id },
        data: req.body,
      });
      res.json(content);
    } else {
      const content = await prisma.heroContent.create({
        data: req.body,
      });
      res.status(201).json(content);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===== HERO SLIDER (/:id'den önce — GET /slider çakışmasını önler) =====
router.get('/slider', async (req, res) => {
  try {
    const slides = await prisma.heroSlider.findMany({
      orderBy: { order: 'asc' },
    });
    res.json(slides);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/slider/:id', async (req, res) => {
  try {
    const slide = await prisma.heroSlider.findUnique({
      where: { id: req.params.id },
    });

    if (!slide) {
      return res.status(404).json({ error: 'Slider item not found' });
    }

    res.json(slide);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/slider', sliderUpload.single('image'), async (req, res) => {
  try {
    const imagePath = req.file
      ? `/uploads/hero-slider/${req.file.filename}`
      : req.body.image;

    if (!imagePath) {
      return res.status(400).json({ error: 'Görsel zorunludur' });
    }

    const order = parseInt(String(req.body.order ?? '0'), 10);

    const slide = await prisma.heroSlider.create({
      data: {
        image: imagePath,
        title: req.body.title || ' ',
        titleEn: req.body.titleEn || null,
        titleAr: req.body.titleAr || null,
        subtitle: req.body.subtitle || null,
        subtitleEn: req.body.subtitleEn || null,
        subtitleAr: req.body.subtitleAr || null,
        ctaText: req.body.ctaText || null,
        ctaTextEn: req.body.ctaTextEn || null,
        ctaTextAr: req.body.ctaTextAr || null,
        ctaLink: req.body.ctaLink || null,
        order: Number.isNaN(order) ? 0 : order,
        active: parseBool(req.body.active),
      },
    });
    res.status(201).json(slide);
  } catch (error) {
    console.error('POST /hero/slider', error);
    res.status(500).json({ error: error.message });
  }
});

router.put('/slider/:id', sliderUpload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await prisma.heroSlider.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ error: 'Slider item not found' });
    }

    const order = parseInt(String(req.body.order ?? existing.order), 10);

    const data = {
      title: req.body.title ?? existing.title,
      titleEn: req.body.titleEn ?? existing.titleEn,
      titleAr: req.body.titleAr ?? existing.titleAr,
      subtitle: req.body.subtitle ?? existing.subtitle,
      subtitleEn: req.body.subtitleEn ?? existing.subtitleEn,
      subtitleAr: req.body.subtitleAr ?? existing.subtitleAr,
      ctaText: req.body.ctaText ?? existing.ctaText,
      ctaTextEn: req.body.ctaTextEn ?? existing.ctaTextEn,
      ctaTextAr: req.body.ctaTextAr ?? existing.ctaTextAr,
      ctaLink: req.body.ctaLink ?? existing.ctaLink,
      order: Number.isNaN(order) ? existing.order : order,
      active:
        req.body.active !== undefined && req.body.active !== ''
          ? parseBool(req.body.active)
          : existing.active,
    };

    if (req.file) {
      data.image = `/uploads/hero-slider/${req.file.filename}`;
    }

    const slide = await prisma.heroSlider.update({
      where: { id },
      data,
    });
    res.json(slide);
  } catch (error) {
    console.error('PUT /hero/slider/:id', error);
    res.status(500).json({ error: error.message });
  }
});

router.delete('/slider/:id', async (req, res) => {
  try {
    await prisma.heroSlider.delete({
      where: { id: req.params.id },
    });
    res.json({ message: 'Slider item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===== HERO IMAGE by id (parametreli — en sonda) =====
router.get('/:id', async (req, res) => {
  try {
    const image = await prisma.heroImage.findUnique({
      where: { id: req.params.id },
    });

    if (!image) {
      return res.status(404).json({ error: 'Hero image not found' });
    }

    res.json(image);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const image = await prisma.heroImage.create({
      data: req.body,
    });
    res.status(201).json(image);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/images', async (req, res) => {
  try {
    const image = await prisma.heroImage.create({
      data: req.body,
    });
    res.status(201).json(image);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const image = await prisma.heroImage.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(image);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/images/:id', async (req, res) => {
  try {
    const image = await prisma.heroImage.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(image);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/images/:id', async (req, res) => {
  try {
    await prisma.heroImage.delete({
      where: { id: req.params.id },
    });
    res.json({ message: 'Hero image deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
