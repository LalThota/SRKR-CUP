// routes/marketplace.js
const express = require('express');
const router = express.Router();
const Item = require('../models/Item');


// Post an item to sell
router.post('/sell', async (req, res) => {
    const { title, description, price, seller } = req.body;
    try {
        const item = new Item({ title, description, price, seller });
        await item.save();
        res.status(201).json({ message: "Item listed for sale", item });
    } catch (error) {
        res.status(500).json({ error: "Could not list item" });
    }
});

// Get all items for sale
router.get('/items', async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: "Could not fetch items" });
    }
});

module.exports = router;
