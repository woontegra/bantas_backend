import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  try {
    const pages = await prisma.policyPage.findMany({
      orderBy: [{ sidebarGroup: 'asc' }, { order: 'asc' }]
    });
    res.json(pages);
  } catch (error) {
    console.error('Error fetching policy pages:', error);
    res.status(500).json({ error: 'Failed to fetch policy pages' });
  }
});

router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const page = await prisma.policyPage.findUnique({
      where: { slug }
    });
    
    if (!page) {
      return res.status(404).json({ error: 'Policy page not found' });
    }
    
    res.json(page);
  } catch (error) {
    console.error('Error fetching policy page:', error);
    res.status(500).json({ error: 'Failed to fetch policy page' });
  }
});

router.post('/', async (req, res) => {
  try {
    const page = await prisma.policyPage.create({
      data: req.body
    });
    res.status(201).json(page);
  } catch (error) {
    console.error('Error creating policy page:', error);
    res.status(500).json({ error: 'Failed to create policy page' });
  }
});

router.put('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const page = await prisma.policyPage.update({
      where: { slug },
      data: req.body
    });
    res.json(page);
  } catch (error) {
    console.error('Error updating policy page:', error);
    res.status(500).json({ error: 'Failed to update policy page' });
  }
});

router.delete('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    await prisma.policyPage.delete({
      where: { slug }
    });
    res.json({ message: 'Policy page deleted successfully' });
  } catch (error) {
    console.error('Error deleting policy page:', error);
    res.status(500).json({ error: 'Failed to delete policy page' });
  }
});

export default router;
