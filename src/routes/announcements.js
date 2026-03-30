import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  try {
    const announcements = await prisma.announcementBar.findMany({
      where: { active: true }
    });
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/active', async (req, res) => {
  try {
    const announcement = await prisma.announcementBar.findFirst({
      where: { active: true }
    });
    res.json(announcement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { text, textEn, textAr, active } = req.body;

    const announcement = await prisma.announcementBar.create({
      data: {
        text,
        textEn,
        textAr,
        active: active !== false
      }
    });
    res.json(announcement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { text, textEn, textAr, active } = req.body;

    const announcement = await prisma.announcementBar.update({
      where: { id: req.params.id },
      data: {
        text,
        textEn,
        textAr,
        active: active !== false
      }
    });
    res.json(announcement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await prisma.announcementBar.delete({
      where: { id: req.params.id }
    });
    res.json({ message: 'Announcement deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
