import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Get all menu items with hierarchy
router.get('/', async (req, res) => {
  try {
    const menuItems = await prisma.menuItem.findMany({
      where: { active: true },
      include: {
        page: true,
        children: {
          where: { active: true },
          include: {
            page: true,
            children: {
              where: { active: true },
              include: {
                page: true
              },
              orderBy: { order: 'asc' }
            }
          },
          orderBy: { order: 'asc' }
        }
      },
      orderBy: { order: 'asc' }
    });

    // Filter only root items (no parent)
    const rootItems = menuItems.filter(item => !item.parentId);
    res.json(rootItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all menu items (flat, for admin)
router.get('/all', async (req, res) => {
  try {
    const menuItems = await prisma.menuItem.findMany({
      include: {
        page: true,
        parent: true,
        _count: {
          select: { children: true }
        }
      },
      orderBy: [
        { order: 'asc' }
      ]
    });
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single menu item
router.get('/:id', async (req, res) => {
  try {
    const menuItem = await prisma.menuItem.findUnique({
      where: { id: req.params.id },
      include: {
        page: true,
        parent: true,
        children: {
          include: {
            page: true
          },
          orderBy: { order: 'asc' }
        }
      }
    });
    res.json(menuItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create menu item
router.post('/', async (req, res) => {
  try {
    const {
      title, titleEn, titleAr,
      slug, url, icon,
      parentId, pageId,
      order, active
    } = req.body;

    const menuItem = await prisma.menuItem.create({
      data: {
        title,
        titleEn,
        titleAr,
        slug,
        url,
        icon,
        parentId: parentId || null,
        pageId: pageId || null,
        order: order || 0,
        active: active !== false
      },
      include: {
        page: true,
        parent: true
      }
    });

    res.json(menuItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update menu item
router.put('/:id', async (req, res) => {
  try {
    const {
      title, titleEn, titleAr,
      slug, url, icon,
      parentId, pageId,
      order, active
    } = req.body;

    const menuItem = await prisma.menuItem.update({
      where: { id: req.params.id },
      data: {
        title,
        titleEn,
        titleAr,
        slug,
        url,
        icon,
        parentId: parentId || null,
        pageId: pageId || null,
        order,
        active
      },
      include: {
        page: true,
        parent: true
      }
    });

    res.json(menuItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Reorder menu items
router.post('/reorder', async (req, res) => {
  try {
    const { items } = req.body; // Array of { id, order }

    const updates = items.map(item =>
      prisma.menuItem.update({
        where: { id: item.id },
        data: { order: item.order }
      })
    );

    await prisma.$transaction(updates);
    res.json({ message: 'Menu items reordered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete menu item
router.delete('/:id', async (req, res) => {
  try {
    await prisma.menuItem.delete({
      where: { id: req.params.id }
    });
    res.json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
