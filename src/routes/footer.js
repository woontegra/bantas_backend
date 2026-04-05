import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Get all footer data (sections, info, social)
router.get('/', async (req, res) => {
  try {
    const [sections, info, social] = await Promise.all([
      prisma.footerSection.findMany({
        where: { active: true },
        include: {
          links: {
            where: { active: true },
            orderBy: { order: 'asc' }
          }
        },
        orderBy: { order: 'asc' }
      }),
      prisma.footerInfo.findFirst(),
      prisma.footerSocial.findMany({
        where: { active: true },
        orderBy: { order: 'asc' }
      })
    ]);
    res.json({ sections, info, social });
  } catch (error) {
    console.error('Error fetching footer data:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get only sections with links
router.get('/sections', async (req, res) => {
  try {
    const sections = await prisma.footerSection.findMany({
      where: { active: true },
      include: {
        links: {
          where: { active: true },
          orderBy: { order: 'asc' }
        }
      },
      orderBy: { order: 'asc' }
    });
    res.json(sections);
  } catch (error) {
    console.error('Error fetching footer sections:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get single section
router.get('/sections/:id', async (req, res) => {
  try {
    const section = await prisma.footerSection.findUnique({
      where: { id: req.params.id },
      include: { links: true }
    });
    res.json(section);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create section
router.post('/sections', async (req, res) => {
  try {
    const { title, titleEn, titleAr, order, active } = req.body;
    const section = await prisma.footerSection.create({
      data: {
        title,
        titleEn,
        titleAr,
        order: parseInt(order) || 0,
        active: active !== false
      }
    });
    res.json(section);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update section
router.put('/sections/:id', async (req, res) => {
  try {
    const { title, titleEn, titleAr, order, active } = req.body;
    const section = await prisma.footerSection.update({
      where: { id: req.params.id },
      data: {
        title,
        titleEn,
        titleAr,
        order: parseInt(order) || 0,
        active: active !== false
      }
    });
    res.json(section);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete section
router.delete('/sections/:id', async (req, res) => {
  try {
    await prisma.footerSection.delete({
      where: { id: req.params.id }
    });
    res.json({ message: 'Section deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create link
router.post('/links', async (req, res) => {
  try {
    const { sectionId, title, titleEn, titleAr, url, order, active } = req.body;
    const link = await prisma.footerLink.create({
      data: {
        sectionId,
        title,
        titleEn,
        titleAr,
        url,
        order: parseInt(order) || 0,
        active: active !== false
      }
    });
    res.json(link);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update link
router.put('/links/:id', async (req, res) => {
  try {
    const { title, titleEn, titleAr, url, order, active } = req.body;
    const link = await prisma.footerLink.update({
      where: { id: req.params.id },
      data: {
        title,
        titleEn,
        titleAr,
        url,
        order: parseInt(order) || 0,
        active: active !== false
      }
    });
    res.json(link);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete link
router.delete('/links/:id', async (req, res) => {
  try {
    await prisma.footerLink.delete({
      where: { id: req.params.id }
    });
    res.json({ message: 'Link deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===== FOOTER INFO ROUTES =====

// Get footer info
router.get('/info', async (req, res) => {
  try {
    const info = await prisma.footerInfo.findFirst();
    res.json(info);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create or update footer info
router.post('/info', async (req, res) => {
  try {
    const { logoUrl, companyName, companyNameEn, companyNameAr, address, addressEn, addressAr, phone, email, copyrightText, copyrightTextEn, copyrightTextAr } = req.body;
    
    const existingInfo = await prisma.footerInfo.findFirst();
    
    if (existingInfo) {
      const info = await prisma.footerInfo.update({
        where: { id: existingInfo.id },
        data: {
          logoUrl,
          companyName,
          companyNameEn,
          companyNameAr,
          address,
          addressEn,
          addressAr,
          phone,
          email,
          copyrightText,
          copyrightTextEn,
          copyrightTextAr
        }
      });
      res.json(info);
    } else {
      const info = await prisma.footerInfo.create({
        data: {
          logoUrl,
          companyName,
          companyNameEn,
          companyNameAr,
          address,
          addressEn,
          addressAr,
          phone,
          email,
          copyrightText,
          copyrightTextEn,
          copyrightTextAr
        }
      });
      res.json(info);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===== FOOTER SOCIAL ROUTES =====

// Get all social links
router.get('/social', async (req, res) => {
  try {
    const social = await prisma.footerSocial.findMany({
      orderBy: { order: 'asc' }
    });
    res.json(social);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create social link
router.post('/social', async (req, res) => {
  try {
    const { platform, url, icon, order, active } = req.body;
    const social = await prisma.footerSocial.create({
      data: {
        platform,
        url,
        icon,
        order: parseInt(order) || 0,
        active: active !== false
      }
    });
    res.json(social);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update social link
router.put('/social/:id', async (req, res) => {
  try {
    const { platform, url, icon, order, active } = req.body;
    const social = await prisma.footerSocial.update({
      where: { id: req.params.id },
      data: {
        platform,
        url,
        icon,
        order: parseInt(order),
        active
      }
    });
    res.json(social);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete social link
router.delete('/social/:id', async (req, res) => {
  try {
    await prisma.footerSocial.delete({
      where: { id: req.params.id }
    });
    res.json({ message: 'Social link deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
