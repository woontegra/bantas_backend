import express from 'express';
import { PrismaClient } from '@prisma/client';
import multer from 'multer';
import path from 'path';

const router = express.Router();
const prisma = new PrismaClient();

const storage = multer.diskStorage({
  destination: 'uploads/products/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.get('/', async (req, res) => {
  try {
    const products = await prisma.productCategory.findMany({
      orderBy: { order: 'asc' }
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await prisma.productCategory.findUnique({
      where: { id: req.params.id }
    });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, nameEn, nameAr, order, active } = req.body;
    const image = req.file ? `/uploads/products/${req.file.filename}` : null;

    const product = await prisma.productCategory.create({
      data: {
        name,
        nameEn,
        nameAr,
        image,
        order: parseInt(order) || 0,
        active: active === 'true'
      }
    });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { name, nameEn, nameAr, order, active } = req.body;
    const updateData = {
      name,
      nameEn,
      nameAr,
      order: parseInt(order) || 0,
      active: active === 'true'
    };

    if (req.file) {
      updateData.image = `/uploads/products/${req.file.filename}`;
    }

    const product = await prisma.productCategory.update({
      where: { id: req.params.id },
      data: updateData
    });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await prisma.productCategory.delete({
      where: { id: req.params.id }
    });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
