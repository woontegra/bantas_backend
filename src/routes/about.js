import express from 'express';
import { PrismaClient } from '@prisma/client';
import multer from 'multer';
import path from 'path';

const router = express.Router();
const prisma = new PrismaClient();

const storage = multer.diskStorage({
  destination: 'uploads/about/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.fieldname + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.get('/', async (req, res) => {
  try {
    const about = await prisma.aboutSection.findFirst({
      where: { active: true }
    });
    res.json(about);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', upload.fields([
  { name: 'image1', maxCount: 1 },
  { name: 'image2', maxCount: 1 },
  { name: 'image3', maxCount: 1 }
]), async (req, res) => {
  try {
    const { title, titleEn, titleAr, content, contentEn, contentAr, active } = req.body;
    
    const image1 = req.files.image1 ? `/uploads/about/${req.files.image1[0].filename}` : null;
    const image2 = req.files.image2 ? `/uploads/about/${req.files.image2[0].filename}` : null;
    const image3 = req.files.image3 ? `/uploads/about/${req.files.image3[0].filename}` : null;

    const about = await prisma.aboutSection.create({
      data: {
        title,
        titleEn,
        titleAr,
        content,
        contentEn,
        contentAr,
        image1,
        image2,
        image3,
        active: active !== false
      }
    });
    res.json(about);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', upload.fields([
  { name: 'image1', maxCount: 1 },
  { name: 'image2', maxCount: 1 },
  { name: 'image3', maxCount: 1 }
]), async (req, res) => {
  try {
    const { title, titleEn, titleAr, content, contentEn, contentAr, active } = req.body;
    
    const updateData = {
      title,
      titleEn,
      titleAr,
      content,
      contentEn,
      contentAr,
      active: active !== false
    };

    if (req.files.image1) {
      updateData.image1 = `/uploads/about/${req.files.image1[0].filename}`;
    }
    if (req.files.image2) {
      updateData.image2 = `/uploads/about/${req.files.image2[0].filename}`;
    }
    if (req.files.image3) {
      updateData.image3 = `/uploads/about/${req.files.image3[0].filename}`;
    }

    const about = await prisma.aboutSection.update({
      where: { id: req.params.id },
      data: updateData
    });
    res.json(about);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
