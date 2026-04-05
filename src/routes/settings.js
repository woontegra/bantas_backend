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

// Configure multer for logo and favicon uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../../uploads/settings');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const fieldName = file.fieldname; // 'logo' or 'favicon'
    const ext = path.extname(file.originalname);
    cb(null, `${fieldName}-${Date.now()}${ext}`);
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|svg|ico/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

// Get settings (always returns one record, creates if doesn't exist)
router.get('/', async (req, res) => {
  try {
    let settings = await prisma.siteSettings.findFirst();
    
    if (!settings) {
      settings = await prisma.siteSettings.create({
        data: {
          siteName: 'BANTAS'
        }
      });
    }
    
    res.json(settings);
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

// Update settings
router.put('/', upload.fields([
  { name: 'logo', maxCount: 1 },
  { name: 'favicon', maxCount: 1 }
]), async (req, res) => {
  try {
    const {
      siteName, siteNameEn, siteNameAr,
      metaTitle, metaTitleEn, metaTitleAr,
      metaDescription, metaDescriptionEn, metaDescriptionAr,
      metaKeywords, metaKeywordsEn, metaKeywordsAr,
      googleAnalyticsId, googleTagManagerId,
      facebookPixelId, facebookAccessToken,
      googleSearchConsole,
      facebookUrl, twitterUrl, instagramUrl, linkedinUrl, youtubeUrl,
      email, phone, address, addressEn, addressAr,
      ePaymentUrl,
      contactSettings,
      maintenanceMode
    } = req.body;

    let settings = await prisma.siteSettings.findFirst();
    
    const updateData = {
      siteName: siteName || 'BANTAS',
      siteNameEn: siteNameEn || null,
      siteNameAr: siteNameAr || null,
      metaTitle: metaTitle || null,
      metaTitleEn: metaTitleEn || null,
      metaTitleAr: metaTitleAr || null,
      metaDescription: metaDescription || null,
      metaDescriptionEn: metaDescriptionEn || null,
      metaDescriptionAr: metaDescriptionAr || null,
      metaKeywords: metaKeywords || null,
      metaKeywordsEn: metaKeywordsEn || null,
      metaKeywordsAr: metaKeywordsAr || null,
      googleAnalyticsId: googleAnalyticsId || null,
      googleTagManagerId: googleTagManagerId || null,
      facebookPixelId: facebookPixelId || null,
      facebookAccessToken: facebookAccessToken || null,
      googleSearchConsole: googleSearchConsole || null,
      facebookUrl: facebookUrl || null,
      twitterUrl: twitterUrl || null,
      instagramUrl: instagramUrl || null,
      linkedinUrl: linkedinUrl || null,
      youtubeUrl: youtubeUrl || null,
      email: email || null,
      phone: phone || null,
      address: address || null,
      addressEn: addressEn || null,
      addressAr: addressAr || null,
      ePaymentUrl: ePaymentUrl || null,
      contactSettings: contactSettings || null,
      maintenanceMode: maintenanceMode === 'true' || maintenanceMode === true
    };

    // Handle logo upload
    if (req.files && req.files.logo) {
      updateData.logo = `/uploads/settings/${req.files.logo[0].filename}`;
    }

    // Handle favicon upload
    if (req.files && req.files.favicon) {
      updateData.favicon = `/uploads/settings/${req.files.favicon[0].filename}`;
    }

    if (settings) {
      settings = await prisma.siteSettings.update({
        where: { id: settings.id },
        data: updateData
      });
    } else {
      settings = await prisma.siteSettings.create({
        data: updateData
      });
    }

    res.json(settings);
  } catch (error) {
    console.error('Error updating settings:', error);
    res.status(500).json({ error: 'Failed to update settings' });
  }
});

export default router;
