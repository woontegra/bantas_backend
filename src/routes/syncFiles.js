import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tmp = multer({ dest: path.join(__dirname, '../../uploads/tmp') });

router.post('/', tmp.single('file'), async (req, res) => {
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
