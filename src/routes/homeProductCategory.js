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

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'home-product-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

// Get all home product categories
router.get('/', async (req, res) => {
  try {
    const categories = await prisma.homeProductCategory.findMany({
      orderBy: { order: 'asc' }
    });
    res.json(categories);
  } catch (error) {
    console.error('Error fetching home product categories:', error);
    res.status(500).json({ error: 'Failed to fetch home product categories' });
  }
});

// Get single home product category
router.get('/:id', async (req, res) => {
  try {
    const category = await prisma.homeProductCategory.findUnique({
      where: { id: req.params.id }
    });
    
    if (!category) {
      return res.status(404).json({ error: 'Home product category not found' });
    }
    
    res.json(category);
  } catch (error) {
    console.error('Error fetching home product category:', error);
    res.status(500).json({ error: 'Failed to fetch home product category' });
  }
});

// Create home product category
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, nameEn, nameAr, link, description, descriptionEn, descriptionAr, order, active } = req.body;
    
    const categoryData = {
      name,
      nameEn: nameEn || null,
      nameAr: nameAr || null,
      link: link || null,
      description: description || null,
      descriptionEn: descriptionEn || null,
      descriptionAr: descriptionAr || null,
      order: order ? parseInt(order) : 0,
      active: active === 'true' || active === true,
      image: req.file ? `/uploads/${req.file.filename}` : null
    };

    const category = await prisma.homeProductCategory.create({
      data: categoryData
    });

    res.status(201).json(category);
  } catch (error) {
    console.error('Error creating home product category:', error);
    res.status(500).json({ error: 'Failed to create home product category' });
  }
});

// Update home product category
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { name, nameEn, nameAr, link, description, descriptionEn, descriptionAr, order, active } = req.body;
    
    const updateData = {
      name,
      nameEn: nameEn || null,
      nameAr: nameAr || null,
      link: link || null,
      description: description || null,
      descriptionEn: descriptionEn || null,
      descriptionAr: descriptionAr || null,
      order: order ? parseInt(order) : 0,
      active: active === 'true' || active === true
    };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const category = await prisma.homeProductCategory.update({
      where: { id: req.params.id },
      data: updateData
    });

    res.json(category);
  } catch (error) {
    console.error('Error updating home product category:', error);
    res.status(500).json({ error: 'Failed to update home product category' });
  }
});

// Delete home product category
router.delete('/:id', async (req, res) => {
  try {
    await prisma.homeProductCategory.delete({
      where: { id: req.params.id }
    });
    res.json({ message: 'Home product category deleted successfully' });
  } catch (error) {
    console.error('Error deleting home product category:', error);
    res.status(500).json({ error: 'Failed to delete home product category' });
  }
});

export default router;
