import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  try {
    const pages = await prisma.listingPage.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(pages);
  } catch (error) {
    console.error('Error fetching listing pages:', error);
    res.status(500).json({ error: 'Failed to fetch listing pages' });
  }
});

router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const page = await prisma.listingPage.findUnique({
      where: { slug }
    });
    
    if (!page) {
      return res.status(404).json({ error: 'Listing page not found' });
    }
    
    res.json(page);
  } catch (error) {
    console.error('Error fetching listing page:', error);
    res.status(500).json({ error: 'Failed to fetch listing page' });
  }
});

router.post('/', async (req, res) => {
  try {
    const page = await prisma.listingPage.create({
      data: req.body
    });
    res.status(201).json(page);
  } catch (error) {
    console.error('Error creating listing page:', error);
    res.status(500).json({ error: 'Failed to create listing page' });
  }
});

router.put('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const page = await prisma.listingPage.update({
      where: { slug },
      data: req.body
    });
    res.json(page);
  } catch (error) {
    console.error('Error updating listing page:', error);
    res.status(500).json({ error: 'Failed to update listing page' });
  }
});

router.delete('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    await prisma.listingPage.delete({
      where: { slug }
    });
    res.json({ message: 'Listing page deleted successfully' });
  } catch (error) {
    console.error('Error deleting listing page:', error);
    res.status(500).json({ error: 'Failed to delete listing page' });
  }
});

export default router;
