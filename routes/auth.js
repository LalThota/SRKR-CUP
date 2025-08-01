const express = require('express');
const router = express.Router();
const { signup, login, verifyOTP, resendOTP, forgotPassword, resetPassword } = require('../controllers/authController');
const User = require('../models/User');
router.post('/signup', signup);
router.post('/login', login);
router.post('/verify-otp', verifyOTP);
router.post('/resend-otp', resendOTP);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

router.post('/register', async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;
        // Optionally: validate input and check for existing email
        const user = new User({ name, email, password, phone });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || "yoursecretkey";

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        // Create JWT token
        const token = jwt.sign({ id: user._id, email: user.email }, SECRET, { expiresIn: '12h' });
        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
