import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email ve şifre gerekli' });
    }

    // Find user
    const user = await prisma.adminUser.findUnique({
      where: { email }
    });

    if (!user || !user.active) {
      return res.status(401).json({ error: 'Geçersiz email veya şifre' });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Geçersiz email veya şifre' });
    }

    // Generate JWT
    const token = jwt.sign(
      { 
        id: user.id, 
        email: user.email, 
        role: user.role 
      },
      process.env.JWT_SECRET || 'your-secret-key-change-this',
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Giriş yapılamadı' });
  }
});

// POST /api/auth/verify - Verify JWT token
router.post('/verify', async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(401).json({ error: 'Token gerekli' });
    }

    const decoded = jwt.verify(
      token, 
      process.env.JWT_SECRET || 'your-secret-key-change-this'
    );

    const user = await prisma.adminUser.findUnique({
      where: { id: decoded.id }
    });

    if (!user || !user.active) {
      return res.status(401).json({ error: 'Geçersiz token' });
    }

    res.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    res.status(401).json({ error: 'Geçersiz token' });
  }
});

// PUT /api/auth/change-password
router.put('/change-password', async (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body;
    if (!email || !currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Tüm alanlar zorunlu' });
    }
    const user = await prisma.adminUser.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: 'Kullanıcı bulunamadı' });

    const valid = await bcrypt.compare(currentPassword, user.password);
    if (!valid) return res.status(401).json({ error: 'Mevcut şifre yanlış' });

    const hashed = await bcrypt.hash(newPassword, 12);
    await prisma.adminUser.update({ where: { id: user.id }, data: { password: hashed } });
    res.json({ success: true });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ error: 'Şifre değiştirilemedi' });
  }
});

// GET /api/auth/users - List all admin users
router.get('/users', async (req, res) => {
  try {
    const users = await prisma.adminUser.findMany({
      select: { id: true, email: true, name: true, role: true, active: true, createdAt: true },
      orderBy: { createdAt: 'asc' }
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Kullanıcılar alınamadı' });
  }
});

// POST /api/auth/users - Create admin user
router.post('/users', async (req, res) => {
  try {
    const { email, name, password, role } = req.body;
    if (!email || !name || !password) return res.status(400).json({ error: 'Email, isim ve şifre zorunlu' });

    const exists = await prisma.adminUser.findUnique({ where: { email } });
    if (exists) return res.status(409).json({ error: 'Bu email zaten kayıtlı' });

    const hashed = await bcrypt.hash(password, 12);
    const user = await prisma.adminUser.create({
      data: { email, name, password: hashed, role: role || 'admin', active: true }
    });
    res.status(201).json({ id: user.id, email: user.email, name: user.name, role: user.role, active: user.active });
  } catch (error) {
    res.status(500).json({ error: 'Kullanıcı oluşturulamadı' });
  }
});

// PUT /api/auth/users/:id - Update admin user
router.put('/users/:id', async (req, res) => {
  try {
    const { name, role, active, password } = req.body;
    const updateData = { name, role, active };
    if (password) updateData.password = await bcrypt.hash(password, 12);

    const user = await prisma.adminUser.update({
      where: { id: req.params.id },
      data: updateData,
      select: { id: true, email: true, name: true, role: true, active: true }
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Kullanıcı güncellenemedi' });
  }
});

// DELETE /api/auth/users/:id - Delete admin user
router.delete('/users/:id', async (req, res) => {
  try {
    await prisma.adminUser.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Kullanıcı silinemedi' });
  }
});

export default router;
