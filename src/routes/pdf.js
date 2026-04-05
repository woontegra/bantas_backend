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

// Configure multer for PDF uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../../uploads/pdfs');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'pdf-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /pdf/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = file.mimetype === 'application/pdf';
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed!'));
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// Get all PDFs
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const where = category ? { category } : {};
    
    const pdfs = await prisma.pdfDocument.findMany({
      where,
      orderBy: { order: 'asc' }
    });
    res.json(pdfs);
  } catch (error) {
    console.error('Error fetching PDFs:', error);
    res.status(500).json({ error: 'Failed to fetch PDFs' });
  }
});

// Get single PDF
router.get('/:id', async (req, res) => {
  try {
    const pdf = await prisma.pdfDocument.findUnique({
      where: { id: req.params.id }
    });
    
    if (!pdf) {
      return res.status(404).json({ error: 'PDF not found' });
    }
    
    res.json(pdf);
  } catch (error) {
    console.error('Error fetching PDF:', error);
    res.status(500).json({ error: 'Failed to fetch PDF' });
  }
});

// Create PDF
router.post('/', upload.single('file'), async (req, res) => {
  try {
    const { title, titleEn, titleAr, description, descriptionEn, descriptionAr, category, order, active } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ error: 'PDF file is required' });
    }

    const pdfData = {
      title,
      titleEn: titleEn || null,
      titleAr: titleAr || null,
      description: description || null,
      descriptionEn: descriptionEn || null,
      descriptionAr: descriptionAr || null,
      category,
      filePath: `/uploads/pdfs/${req.file.filename}`,
      fileSize: req.file.size,
      order: order ? parseInt(order) : 0,
      active: active === 'true' || active === true
    };

    const pdf = await prisma.pdfDocument.create({
      data: pdfData
    });

    res.status(201).json(pdf);
  } catch (error) {
    console.error('Error creating PDF:', error);
    res.status(500).json({ error: 'Failed to create PDF' });
  }
});

// Update PDF
router.put('/:id', upload.single('file'), async (req, res) => {
  try {
    const { title, titleEn, titleAr, description, descriptionEn, descriptionAr, category, order, active } = req.body;
    
    const updateData = {
      title,
      titleEn: titleEn || null,
      titleAr: titleAr || null,
      description: description || null,
      descriptionEn: descriptionEn || null,
      descriptionAr: descriptionAr || null,
      category,
      order: order ? parseInt(order) : 0,
      active: active === 'true' || active === true
    };

    if (req.file) {
      updateData.filePath = `/uploads/pdfs/${req.file.filename}`;
      updateData.fileSize = req.file.size;
    }

    const pdf = await prisma.pdfDocument.update({
      where: { id: req.params.id },
      data: updateData
    });

    res.json(pdf);
  } catch (error) {
    console.error('Error updating PDF:', error);
    res.status(500).json({ error: 'Failed to update PDF' });
  }
});

// Delete PDF
router.delete('/:id', async (req, res) => {
  try {
    const pdf = await prisma.pdfDocument.findUnique({
      where: { id: req.params.id }
    });

    if (pdf && pdf.filePath) {
      const filePath = path.join(__dirname, '../../', pdf.filePath);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await prisma.pdfDocument.delete({
      where: { id: req.params.id }
    });

    res.json({ message: 'PDF deleted successfully' });
  } catch (error) {
    console.error('Error deleting PDF:', error);
    res.status(500).json({ error: 'Failed to delete PDF' });
  }
});

export default router;
