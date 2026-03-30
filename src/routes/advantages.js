import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  try {
    const advantages = await prisma.advantage.findMany({
      where: { active: true },
      orderBy: { order: 'asc' }
    });
    res.json(advantages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const advantage = await prisma.advantage.findUnique({
      where: { id: req.params.id }
    });
    res.json(advantage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { icon, title, titleEn, titleAr, description, descriptionEn, descriptionAr, order, active } = req.body;

    const advantage = await prisma.advantage.create({
      data: {
        icon,
        title,
        titleEn,
        titleAr,
        description,
        descriptionEn,
        descriptionAr,
        order: parseInt(order) || 0,
        active: active !== false
      }
    });
    res.json(advantage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { icon, title, titleEn, titleAr, description, descriptionEn, descriptionAr, order, active } = req.body;

    const advantage = await prisma.advantage.update({
      where: { id: req.params.id },
      data: {
        icon,
        title,
        titleEn,
        titleAr,
        description,
        descriptionEn,
        descriptionAr,
        order: parseInt(order) || 0,
        active: active !== false
      }
    });
    res.json(advantage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await prisma.advantage.delete({
      where: { id: req.params.id }
    });
    res.json({ message: 'Advantage deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
