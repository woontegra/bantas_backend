import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/info', async (req, res) => {
  try {
    const info = await prisma.footerInfo.findFirst();
    res.json(info);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/info/:id', async (req, res) => {
  try {
    const { address, addressEn, addressAr, phone, email } = req.body;

    const info = await prisma.footerInfo.update({
      where: { id: req.params.id },
      data: {
        address,
        addressEn,
        addressAr,
        phone,
        email
      }
    });
    res.json(info);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/links', async (req, res) => {
  try {
    const links = await prisma.footerLink.findMany({
      where: { active: true },
      orderBy: { order: 'asc' }
    });
    res.json(links);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/links', async (req, res) => {
  try {
    const { category, label, labelEn, labelAr, href, order, active } = req.body;

    const link = await prisma.footerLink.create({
      data: {
        category,
        label,
        labelEn,
        labelAr,
        href,
        order: parseInt(order) || 0,
        active: active !== false
      }
    });
    res.json(link);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/links/:id', async (req, res) => {
  try {
    const { category, label, labelEn, labelAr, href, order, active } = req.body;

    const link = await prisma.footerLink.update({
      where: { id: req.params.id },
      data: {
        category,
        label,
        labelEn,
        labelAr,
        href,
        order: parseInt(order) || 0,
        active: active !== false
      }
    });
    res.json(link);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/links/:id', async (req, res) => {
  try {
    await prisma.footerLink.delete({
      where: { id: req.params.id }
    });
    res.json({ message: 'Footer link deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
