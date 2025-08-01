const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST /api/users
router.post('/', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newUser = new User({ name, email, password });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});
// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users); // Send all users as JSON
    } catch (err) {
        res.status(500).json({ message: 'Error fetching users' });
    }
});

module.exports = router;
