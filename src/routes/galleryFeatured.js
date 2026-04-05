import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Get all featured images
router.get('/', async (req, res) => {
  try {
    const featured = await prisma.galleryFeatured.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(featured);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get featured image by type
router.get('/type/:type', async (req, res) => {
  try {
    const featured = await prisma.galleryFeatured.findFirst({
      where: { 
        type: req.params.type,
        active: true 
      },
    });
    res.json(featured);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single featured image by ID
router.get('/:id', async (req, res) => {
  try {
    const featured = await prisma.galleryFeatured.findUnique({
      where: { id: req.params.id },
    });
    
    if (!featured) {
      return res.status(404).json({ error: 'Featured image not found' });
    }
    
    res.json(featured);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create featured image
router.post('/', async (req, res) => {
  try {
    const featured = await prisma.galleryFeatured.create({
      data: req.body,
    });
    res.status(201).json(featured);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update featured image
router.put('/:id', async (req, res) => {
  try {
    const featured = await prisma.galleryFeatured.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(featured);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete featured image
router.delete('/:id', async (req, res) => {
  try {
    await prisma.galleryFeatured.delete({
      where: { id: req.params.id },
    });
    res.json({ message: 'Featured image deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
