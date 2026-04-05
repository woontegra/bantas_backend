import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Get all news
router.get('/', async (req, res) => {
  try {
    const { category, featured, active } = req.query;
    const where = {};
    
    if (category) where.category = category;
    if (featured !== undefined) where.featured = featured === 'true';
    if (active !== undefined) where.active = active === 'true';
    
    const news = await prisma.news.findMany({
      where,
      orderBy: { publishedAt: 'desc' },
    });
    
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single news by ID
router.get('/:id', async (req, res) => {
  try {
    const news = await prisma.news.findUnique({
      where: { id: req.params.id },
    });
    
    if (!news) {
      return res.status(404).json({ error: 'News not found' });
    }
    
    // Increment view count
    await prisma.news.update({
      where: { id: req.params.id },
      data: { viewCount: { increment: 1 } },
    });
    
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get news by slug
router.get('/slug/:slug', async (req, res) => {
  try {
    const news = await prisma.news.findUnique({
      where: { slug: req.params.slug },
    });
    
    if (!news) {
      return res.status(404).json({ error: 'News not found' });
    }
    
    // Increment view count
    await prisma.news.update({
      where: { slug: req.params.slug },
      data: { viewCount: { increment: 1 } },
    });
    
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create news
router.post('/', async (req, res) => {
  try {
    const news = await prisma.news.create({
      data: req.body,
    });
    res.status(201).json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update news
router.put('/:id', async (req, res) => {
  try {
    const news = await prisma.news.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete news
router.delete('/:id', async (req, res) => {
  try {
    await prisma.news.delete({
      where: { id: req.params.id },
    });
    res.json({ message: 'News deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
