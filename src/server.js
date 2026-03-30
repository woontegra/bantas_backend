import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/products.js';
import beforeAfterRoutes from './routes/beforeAfter.js';
import advantageRoutes from './routes/advantages.js';
import announcementRoutes from './routes/announcements.js';
import aboutRoutes from './routes/about.js';
import footerRoutes from './routes/footer.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/products', productRoutes);
app.use('/api/before-after', beforeAfterRoutes);
app.use('/api/advantages', advantageRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/footer', footerRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Bantas API is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
