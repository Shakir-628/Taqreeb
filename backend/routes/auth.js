const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

router.post('/register', async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;
        if (!JWT_SECRET) return res.status(500).json({ error: 'Authentication is not configured' });
        if (!name || !email || !password || password.length < 8) {
            return res.status(400).json({ error: 'Name, email and a password of at least 8 characters are required' });
        }
        const user = new User({ name, email: email.trim().toLowerCase(), password, role: 'customer', phone });
        await user.save();
        
        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
        res.status(201).json({ token, user: { id: user._id, name, email: user.email, role: user.role } });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!JWT_SECRET) return res.status(500).json({ error: 'Authentication is not configured' });
        const user = await User.findOne({ email: email?.trim().toLowerCase() });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, user: { id: user._id, name: user.name, email, role: user.role } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
