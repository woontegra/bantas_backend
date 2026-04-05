import express from 'express';
import { PrismaClient } from '@prisma/client';
import multer from 'multer';
import path from 'path';

const router = express.Router();
const prisma = new PrismaClient();

const storage = multer.diskStorage({
  destination: 'uploads/pages/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }
});

// Get all pages
router.get('/', async (req, res) => {
  try {
    const pages = await prisma.page.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(pages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get page by slug
router.get('/slug/:slug', async (req, res) => {
  try {
    const page = await prisma.page.findUnique({
      where: { slug: req.params.slug }
    });
    res.json(page);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get page by ID
router.get('/:id', async (req, res) => {
  try {
    const page = await prisma.page.findUnique({
      where: { id: req.params.id }
    });
    res.json(page);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create page
router.post('/', async (req, res) => {
  try {
    const {
      title, titleEn, titleAr, slug,
      sections, sectionsEn, sectionsAr,
      excerpt, excerptEn, excerptAr,
      heroImage, seoTitle, seoDescription,
      template, active
    } = req.body;

    const page = await prisma.page.create({
      data: {
        title,
        titleEn,
        titleAr,
        slug,
        sections: sections || '[]',
        sectionsEn,
        sectionsAr,
        excerpt,
        excerptEn,
        excerptAr,
        heroImage,
        seoTitle,
        seoDescription,
        template: template || 'default',
        active: active !== false
      }
    });
    res.json(page);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update page
router.put('/:id', async (req, res) => {
  try {
    const {
      title, titleEn, titleAr, slug,
      sections, sectionsEn, sectionsAr,
      excerpt, excerptEn, excerptAr,
      heroImage, seoTitle, seoDescription,
      template, active
    } = req.body;

    const updateData = {
      title,
      titleEn,
      titleAr,
      slug,
      sections,
      sectionsEn,
      sectionsAr,
      excerpt,
      excerptEn,
      excerptAr,
      heroImage,
      seoTitle,
      seoDescription,
      template,
      active
    };

    const page = await prisma.page.update({
      where: { id: req.params.id },
      data: updateData
    });
    res.json(page);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete page
router.delete('/:id', async (req, res) => {
  try {
    await prisma.page.delete({
      where: { id: req.params.id }
    });
    res.json({ message: 'Page deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
