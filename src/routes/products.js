import express from 'express';
import { PrismaClient } from '@prisma/client';
import multer from 'multer';
import path from 'path';

const router = express.Router();
const prisma = new PrismaClient();

const storage = multer.diskStorage({
  destination: 'uploads/products/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

// ===== CATEGORY ROUTES =====

// Get all categories with product count
router.get('/categories', async (req, res) => {
  try {
    const categories = await prisma.productCategory.findMany({
      include: {
        _count: {
          select: { products: true }
        }
      },
      orderBy: { order: 'asc' }
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single category with products
router.get('/categories/:id', async (req, res) => {
  try {
    const category = await prisma.productCategory.findUnique({
      where: { id: req.params.id },
      include: {
        products: {
          where: { active: true },
          orderBy: { order: 'asc' }
        }
      }
    });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get category by slug
router.get('/categories/slug/:slug', async (req, res) => {
  try {
    const category = await prisma.productCategory.findUnique({
      where: { slug: req.params.slug },
      include: {
        products: {
          where: { active: true },
          orderBy: { order: 'asc' }
        }
      }
    });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create category
router.post('/categories', upload.single('image'), async (req, res) => {
  try {
    const { name, nameEn, nameAr, slug, description, descriptionEn, descriptionAr, order, active } = req.body;
    const image = req.file ? `/uploads/products/${req.file.filename}` : null;

    const category = await prisma.productCategory.create({
      data: {
        name,
        nameEn,
        nameAr,
        slug,
        description,
        descriptionEn,
        descriptionAr,
        image,
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
router.put('/categories/:id', upload.single('image'), async (req, res) => {
  try {
    const { name, nameEn, nameAr, slug, description, descriptionEn, descriptionAr, order, active } = req.body;
    const updateData = {
      name,
      nameEn,
      nameAr,
      slug,
      description,
      descriptionEn,
      descriptionAr,
      order: parseInt(order),
      active
    };

    if (req.file) {
      updateData.image = `/uploads/products/${req.file.filename}`;
    }

    const category = await prisma.productCategory.update({
      where: { id: req.params.id },
      data: updateData
    });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete category
router.delete('/categories/:id', async (req, res) => {
  try {
    await prisma.productCategory.delete({
      where: { id: req.params.id }
    });
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===== PRODUCT ROUTES =====

// Get all products
router.get('/', async (req, res) => {
  try {
    const { categoryId, featured } = req.query;
    const where = {};
    
    if (categoryId) where.categoryId = categoryId;
    if (featured === 'true') where.featured = true;
    
    const products = await prisma.product.findMany({
      where,
      include: {
        category: true
      },
      orderBy: { order: 'asc' }
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
      include: {
        category: true
      }
    });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get product by slug
router.get('/slug/:slug', async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { slug: req.params.slug },
      include: {
        category: true
      }
    });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create product
router.post('/', upload.fields([
  { name: 'mainImage', maxCount: 1 },
  { name: 'images', maxCount: 10 }
]), async (req, res) => {
  try {
    const { 
      name, nameEn, nameAr, slug, 
      description, descriptionEn, descriptionAr,
      shortDesc, shortDescEn, shortDescAr,
      specifications, specificationsEn, specificationsAr,
      features, featuresEn, featuresAr,
      categoryId, order, active, featured
    } = req.body;

    const mainImage = req.files?.mainImage ? `/uploads/products/${req.files.mainImage[0].filename}` : null;
    const images = req.files?.images ? JSON.stringify(req.files.images.map(f => `/uploads/products/${f.filename}`)) : null;

    const product = await prisma.product.create({
      data: {
        name,
        nameEn,
        nameAr,
        slug,
        description,
        descriptionEn,
        descriptionAr,
        shortDesc,
        shortDescEn,
        shortDescAr,
        mainImage,
        images,
        specifications,
        specificationsEn,
        specificationsAr,
        features,
        featuresEn,
        featuresAr,
        categoryId,
        order: parseInt(order) || 0,
        active: active !== false,
        featured: featured === true
      }
    });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update product
router.put('/:id', upload.fields([
  { name: 'mainImage', maxCount: 1 },
  { name: 'images', maxCount: 10 }
]), async (req, res) => {
  try {
    const { 
      name, nameEn, nameAr, slug, 
      description, descriptionEn, descriptionAr,
      shortDesc, shortDescEn, shortDescAr,
      specifications, specificationsEn, specificationsAr,
      features, featuresEn, featuresAr,
      categoryId, order, active, featured
    } = req.body;

    const updateData = {
      name,
      nameEn,
      nameAr,
      slug,
      description,
      descriptionEn,
      descriptionAr,
      shortDesc,
      shortDescEn,
      shortDescAr,
      specifications,
      specificationsEn,
      specificationsAr,
      features,
      featuresEn,
      featuresAr,
      categoryId,
      order: parseInt(order),
      active,
      featured
    };

    if (req.files?.mainImage) {
      updateData.mainImage = `/uploads/products/${req.files.mainImage[0].filename}`;
    }
    if (req.files?.images) {
      updateData.images = JSON.stringify(req.files.images.map(f => `/uploads/products/${f.filename}`));
    }

    const product = await prisma.product.update({
      where: { id: req.params.id },
      data: updateData
    });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete product
router.delete('/:id', async (req, res) => {
  try {
    await prisma.product.delete({
      where: { id: req.params.id }
    });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
