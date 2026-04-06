import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import jwt from 'jsonwebtoken';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple auth middleware
function adminAuth(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'Token gerekli' });
  const token = auth.replace('Bearer ', '');
  try {
    jwt.verify(token, process.env.JWT_SECRET || 'bantas-secret-key-2024');
    next();
  } catch {
    res.status(401).json({ error: 'Geçersiz token' });
  }
}

// Multer: save to temp, then move to target path
const tmp = multer({ dest: path.join(__dirname, '../../uploads/tmp') });

router.post('/', adminAuth, tmp.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'Dosya yok' });

    const targetPath = req.body.targetPath; // e.g. "gallery/image.jpg" or "settings/logo.png"
    if (!targetPath) return res.status(400).json({ error: 'targetPath gerekli' });

    const dest = path.join(__dirname, '../../uploads', targetPath);
    const destDir = path.dirname(dest);

    if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

    fs.renameSync(req.file.path, dest);

    res.json({ success: true, path: `/uploads/${targetPath}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
