import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// ===== GALLERY CATEGORIES (Using ProductCategory) =====

// Get all categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await prisma.productCategory.findMany({
      orderBy: { order: 'asc' },
      include: {
        galleryImages: {
          where: { active: true },
          orderBy: { order: 'asc' },
        },
      },
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single category by ID
router.get('/categories/:id', async (req, res) => {
  try {
    const category = await prisma.productCategory.findUnique({
      where: { id: req.params.id },
      include: {
        galleryImages: {
          orderBy: { order: 'asc' },
        },
      },
    });
    
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===== GALLERY IMAGES =====

// Get all images
router.get('/images', async (req, res) => {
  try {
    const images = await prisma.galleryImage.findMany({
      orderBy: { order: 'asc' },
      include: {
        category: true,
      },
    });
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get images by category
router.get('/images/category/:categoryId', async (req, res) => {
  try {
    const images = await prisma.galleryImage.findMany({
      where: { categoryId: req.params.categoryId },
      orderBy: { order: 'asc' },
      include: {
        category: true,
      },
    });
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single image by ID
router.get('/images/:id', async (req, res) => {
  try {
    const image = await prisma.galleryImage.findUnique({
      where: { id: req.params.id },
      include: {
        category: true,
      },
    });
    
    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }
    
    res.json(image);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create image
router.post('/images', async (req, res) => {
  try {
    const image = await prisma.galleryImage.create({
      data: req.body,
      include: {
        category: true,
      },
    });
    res.status(201).json(image);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update image
router.put('/images/:id', async (req, res) => {
  try {
    const image = await prisma.galleryImage.update({
      where: { id: req.params.id },
      data: req.body,
      include: {
        category: true,
      },
    });
    res.json(image);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete image
router.delete('/images/:id', async (req, res) => {
  try {
    await prisma.galleryImage.delete({
      where: { id: req.params.id },
    });
    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Reorder images within a category
router.post('/images/reorder', async (req, res) => {
  try {
    const { items } = req.body;
    
    await Promise.all(
      items.map((item, index) =>
        prisma.galleryImage.update({
          where: { id: item.id },
          data: { order: index },
        })
      )
    );
    
    res.json({ message: 'Images reordered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
