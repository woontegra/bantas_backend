import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Get contact page (single record)
router.get('/', async (req, res) => {
  try {
    const page = await prisma.contactPage.findFirst();
    
    if (!page) {
      return res.status(404).json({ error: 'Contact page not found' });
    }
    
    res.json(page);
  } catch (error) {
    console.error('Error fetching contact page:', error);
    res.status(500).json({ error: 'Failed to fetch contact page' });
  }
});

// Create or update contact page
router.post('/', async (req, res) => {
  try {
    const existing = await prisma.contactPage.findFirst();
    
    let page;
    if (existing) {
      page = await prisma.contactPage.update({
        where: { id: existing.id },
        data: req.body
      });
    } else {
      page = await prisma.contactPage.create({
        data: req.body
      });
    }
    
    res.json(page);
  } catch (error) {
    console.error('Error saving contact page:', error);
    res.status(500).json({ error: 'Failed to save contact page' });
  }
});

// Update contact page
router.put('/', async (req, res) => {
  try {
    const existing = await prisma.contactPage.findFirst();
    
    if (!existing) {
      return res.status(404).json({ error: 'Contact page not found' });
    }
    
    const page = await prisma.contactPage.update({
      where: { id: existing.id },
      data: req.body
    });
    
    res.json(page);
  } catch (error) {
    console.error('Error updating contact page:', error);
    res.status(500).json({ error: 'Failed to update contact page' });
  }
});

export default router;
