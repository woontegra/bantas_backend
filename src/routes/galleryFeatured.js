import express from 'express';
import { PrismaClient } from '@prisma/client';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const router = express.Router();
const prisma = new PrismaClient();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '../../uploads/gallery');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `featured-${Date.now()}${ext}`);
  },
});
const upload = multer({ storage, limits: { fileSize: 20 * 1024 * 1024 } });

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
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) data.image = `/uploads/gallery/${req.file.filename}`;
    const featured = await prisma.galleryFeatured.create({ data });
    res.status(201).json(featured);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update featured image
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) data.image = `/uploads/gallery/${req.file.filename}`;
    const featured = await prisma.galleryFeatured.update({
      where: { id: req.params.id },
      data,
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
