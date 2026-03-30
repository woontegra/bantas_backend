import express from 'express';
import { PrismaClient } from '@prisma/client';
import multer from 'multer';
import path from 'path';

const router = express.Router();
const prisma = new PrismaClient();

const storage = multer.diskStorage({
  destination: 'uploads/before-after/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.fieldname + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.get('/', async (req, res) => {
  try {
    const items = await prisma.beforeAfter.findMany({
      where: { active: true }
    });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const item = await prisma.beforeAfter.findUnique({
      where: { id: req.params.id }
    });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', upload.fields([
  { name: 'beforeImage', maxCount: 1 },
  { name: 'afterImage', maxCount: 1 }
]), async (req, res) => {
  try {
    const { title, titleEn, titleAr, description, descriptionEn, descriptionAr, active } = req.body;
    
    const beforeImage = req.files.beforeImage ? `/uploads/before-after/${req.files.beforeImage[0].filename}` : null;
    const afterImage = req.files.afterImage ? `/uploads/before-after/${req.files.afterImage[0].filename}` : null;

    const item = await prisma.beforeAfter.create({
      data: {
        beforeImage,
        afterImage,
        title,
        titleEn,
        titleAr,
        description,
        descriptionEn,
        descriptionAr,
        active: active === 'true'
      }
    });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', upload.fields([
  { name: 'beforeImage', maxCount: 1 },
  { name: 'afterImage', maxCount: 1 }
]), async (req, res) => {
  try {
    const { title, titleEn, titleAr, description, descriptionEn, descriptionAr, active } = req.body;
    
    const updateData = {
      title,
      titleEn,
      titleAr,
      description,
      descriptionEn,
      descriptionAr,
      active: active === 'true'
    };

    if (req.files.beforeImage) {
      updateData.beforeImage = `/uploads/before-after/${req.files.beforeImage[0].filename}`;
    }
    if (req.files.afterImage) {
      updateData.afterImage = `/uploads/before-after/${req.files.afterImage[0].filename}`;
    }

    const item = await prisma.beforeAfter.update({
      where: { id: req.params.id },
      data: updateData
    });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await prisma.beforeAfter.delete({
      where: { id: req.params.id }
    });
    res.json({ message: 'Before/After deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
