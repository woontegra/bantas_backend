import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  try {
    const pages = await prisma.contentPage.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(pages);
  } catch (error) {
    console.error('Error fetching content pages:', error);
    res.status(500).json({ error: 'Failed to fetch content pages' });
  }
});

router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const page = await prisma.contentPage.findUnique({
      where: { slug }
    });
    
    if (!page) {
      return res.status(404).json({ error: 'Content page not found' });
    }
    
    res.json(page);
  } catch (error) {
    console.error('Error fetching content page:', error);
    res.status(500).json({ error: 'Failed to fetch content page' });
  }
});

router.post('/', async (req, res) => {
  try {
    const page = await prisma.contentPage.create({
      data: req.body
    });
    res.status(201).json(page);
  } catch (error) {
    console.error('Error creating content page:', error);
    res.status(500).json({ error: 'Failed to create content page' });
  }
});

router.put('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const { title, ...rest } = req.body;
    const resolvedTitle = title || slug;
    const page = await prisma.contentPage.upsert({
      where:  { slug },
      update: { title: resolvedTitle, ...rest },
      create: { slug, title: resolvedTitle, ...rest },
    });
    res.json(page);
  } catch (error) {
    console.error('Error upserting content page:', error);
    res.status(500).json({ error: 'Failed to update content page' });
  }
});

router.delete('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    await prisma.contentPage.delete({
      where: { slug }
    });
    res.json({ message: 'Content page deleted successfully' });
  } catch (error) {
    console.error('Error deleting content page:', error);
    res.status(500).json({ error: 'Failed to delete content page' });
  }
});

export default router;
