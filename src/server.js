import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/products.js';
import beforeAfterRoutes from './routes/beforeAfter.js';
import advantageRoutes from './routes/advantages.js';
import announcementRoutes from './routes/announcements.js';
import aboutRoutes from './routes/about.js';
import footerRoutes from './routes/footer.js';
import menuRoutes from './routes/menu.js';
import authRoutes from './routes/auth.js';
import newsRoutes from './routes/news.js';
import heroRoutes from './routes/hero.js';
import uploadRoutes from './routes/upload.js';
import galleryRoutes from './routes/gallery.js';
import galleryFeaturedRoutes from './routes/galleryFeatured.js';
import homeProductCategoryRoutes from './routes/homeProductCategory.js';
import pdfRoutes from './routes/pdf.js';
import settingsRoutes from './routes/settings.js';
import contactRoutes from './routes/contact.js';
import pagesRoutes from './routes/pages.js';
import menuItemsRoutes from './routes/menuItems.js';
import productPagesRoutes from './routes/productPages.js';
import contentPagesRoutes from './routes/contentPages.js';
import policyPagesRoutes from './routes/policyPages.js';
import listingPagesRoutes from './routes/listingPages.js';
import contactPageRoutes from './routes/contactPage.js';
import mediaRoutes from './routes/media.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Bantas Backend API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      products: '/api/products',
      beforeAfter: '/api/before-after',
      advantages: '/api/advantages',
      announcements: '/api/announcements',
      about: '/api/about',
      footer: '/api/footer',
      menu: '/api/menu/about',
      news: '/api/news',
      hero: '/api/hero',
      upload: '/api/upload',
      gallery: '/api/gallery',
      galleryFeatured: '/api/gallery-featured',
      homeProductCategory: '/api/home-product-categories',
      pdfs: '/api/pdfs',
      settings: '/api/settings',
      contact: '/api/contact'
    }
  });
});

app.use('/api/products', productRoutes);
app.use('/api/before-after', beforeAfterRoutes);
app.use('/api/advantages', advantageRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/footer', footerRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/hero', heroRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/gallery-featured', galleryFeaturedRoutes);
app.use('/api/home-product-categories', homeProductCategoryRoutes);
app.use('/api/pdfs', pdfRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/pages', pagesRoutes);
app.use('/api/menu-items', menuItemsRoutes);
app.use('/api/product-pages', productPagesRoutes);
app.use('/api/content-pages', contentPagesRoutes);
app.use('/api/policy-pages', policyPagesRoutes);
app.use('/api/listing-pages', listingPagesRoutes);
app.use('/api/contact-page', contactPageRoutes);
app.use('/api/media', mediaRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Bantas API is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
