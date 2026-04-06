import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// One-time migration: replace localhost URLs with relative paths
router.post('/', async (req, res) => {
  const OLD = 'http://localhost:5000';
  let fixed = 0;

  try {
    // Gallery images
    const galleryImgs = await prisma.galleryImage.findMany();
    for (const img of galleryImgs) {
      if (img.image?.startsWith(OLD)) {
        await prisma.galleryImage.update({
          where: { id: img.id },
          data: { image: img.image.replace(OLD, '') },
        });
        fixed++;
      }
    }

    // Gallery featured
    const featured = await prisma.galleryFeatured.findMany();
    for (const f of featured) {
      if (f.image?.startsWith(OLD)) {
        await prisma.galleryFeatured.update({
          where: { id: f.id },
          data: { image: f.image.replace(OLD, '') },
        });
        fixed++;
      }
    }

    // Hero slides
    const heroes = await prisma.heroSlider.findMany();
    for (const h of heroes) {
      if (h.image?.startsWith(OLD)) {
        await prisma.heroSlider.update({
          where: { id: h.id },
          data: { image: h.image.replace(OLD, '') },
        });
        fixed++;
      }
    }

    // Product pages
    const products = await prisma.productPage.findMany();
    for (const p of products) {
      if (p.mainImage?.startsWith(OLD)) {
        await prisma.productPage.update({
          where: { id: p.id },
          data: { mainImage: p.mainImage.replace(OLD, '') },
        });
        fixed++;
      }
    }

    // Site settings
    const settings = await prisma.siteSettings.findFirst();
    if (settings) {
      const updates = {};
      if (settings.logo?.startsWith(OLD)) updates.logo = settings.logo.replace(OLD, '');
      if (settings.favicon?.startsWith(OLD)) updates.favicon = settings.favicon.replace(OLD, '');
      if (Object.keys(updates).length > 0) {
        await prisma.siteSettings.update({ where: { id: settings.id }, data: updates });
        fixed++;
      }
    }

    res.json({ success: true, fixed });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
