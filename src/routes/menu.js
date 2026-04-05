import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// ===== CATEGORY ROUTES =====

// Get all categories with items (for admin)
router.get('/categories', async (req, res) => {
  try {
    const categories = await prisma.menuCategory.findMany({
      include: {
        items: {
          orderBy: { order: 'asc' }
        }
      },
      orderBy: { order: 'asc' }
    });
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get single category
router.get('/categories/:id', async (req, res) => {
  try {
    const category = await prisma.menuCategory.findUnique({
      where: { id: req.params.id },
      include: { items: true }
    });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create category
router.post('/categories', async (req, res) => {
  try {
    const { title, titleEn, titleAr, slug, icon, order, active } = req.body;
    const category = await prisma.menuCategory.create({
      data: {
        title,
        titleEn,
        titleAr,
        slug,
        icon,
        order: parseInt(order) || 0,
        active: active !== false
      }
    });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update category
router.put('/categories/:id', async (req, res) => {
  try {
    const { title, titleEn, titleAr, slug, icon, order, active } = req.body;
    const category = await prisma.menuCategory.update({
      where: { id: req.params.id },
      data: {
        title,
        titleEn,
        titleAr,
        slug,
        icon,
        order: parseInt(order),
        active
      }
    });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete category
router.delete('/categories/:id', async (req, res) => {
  try {
    await prisma.menuCategory.delete({
      where: { id: req.params.id }
    });
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===== ITEM ROUTES =====

// Get all items
router.get('/items', async (req, res) => {
  try {
    const items = await prisma.menuItem.findMany({
      orderBy: { order: 'asc' }
    });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create item
router.post('/items', async (req, res) => {
  try {
    const { title, titleEn, titleAr, slug, link, order, active, categoryId } = req.body;
    const item = await prisma.menuItem.create({
      data: {
        title,
        titleEn,
        titleAr,
        slug,
        link,
        order: parseInt(order) || 0,
        active: active !== false,
        categoryId
      }
    });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update item
router.put('/items/:id', async (req, res) => {
  try {
    const { title, titleEn, titleAr, slug, link, order, active, categoryId } = req.body;
    const item = await prisma.menuItem.update({
      where: { id: req.params.id },
      data: {
        title,
        titleEn,
        titleAr,
        slug,
        link,
        order: parseInt(order),
        active,
        categoryId
      }
    });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete item
router.delete('/items/:id', async (req, res) => {
  try {
    await prisma.menuItem.delete({
      where: { id: req.params.id }
    });
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===== PUBLIC ROUTE =====

// GET /api/menu/about - Mega menu data for frontend
router.get('/about', async (req, res) => {
  try {
    const categories = await prisma.menuCategory.findMany({
      where: { active: true },
      include: {
        items: {
          where: { active: true },
          orderBy: { order: 'asc' }
        }
      },
      orderBy: { order: 'asc' }
    });

    const featuredContent = await prisma.featuredContent.findFirst({
      where: { active: true }
    });

    res.json({
      categories: categories.map(cat => ({
        id: cat.id,
        title: cat.title,
        titleEn: cat.titleEn,
        titleAr: cat.titleAr,
        slug: cat.slug,
        icon: cat.icon,
        order: cat.order,
        items: cat.items.map(item => ({
          id: item.id,
          title: item.title,
          titleEn: item.titleEn,
          titleAr: item.titleAr,
          slug: item.slug,
          link: item.link,
          order: item.order
        }))
      })),
      featuredContent: featuredContent ? {
        image: featuredContent.image,
        title: featuredContent.title,
        titleEn: featuredContent.titleEn,
        titleAr: featuredContent.titleAr,
        description: featuredContent.description,
        descriptionEn: featuredContent.descriptionEn,
        descriptionAr: featuredContent.descriptionAr,
        buttonText: featuredContent.buttonText,
        buttonTextEn: featuredContent.buttonTextEn,
        buttonTextAr: featuredContent.buttonTextAr,
        buttonLink: featuredContent.buttonLink
      } : null
    });
  } catch (error) {
    console.error('Error fetching menu data:', error);
    res.status(500).json({ error: 'Failed to fetch menu data' });
  }
});

export default router;
