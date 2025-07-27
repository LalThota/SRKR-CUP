const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    try {
        const { name, regdNo, email, phone, password } = req.body;
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'User already exists' });

        const hashed = await bcrypt.hash(password, 10);
        user = new User({ name, regdNo, email, phone, password: hashed });
        await user.save();

        res.status(201).json({ message: 'User created. Please login.' });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password, isAdmin } = req.body;
        const user = await User.findOne({ email });
        if (!user || (isAdmin && user.role !== 'admin')) return res.status(403).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(403).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({ token, user: { name: user.name, email: user.email, role: user.role } });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};
