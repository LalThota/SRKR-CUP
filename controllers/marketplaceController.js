const LostItem = require('../models/LostItem');
const MarketPlaceItem = require('../models/MarketPlaceItem');

exports.postItem = async (req, res) => {
    const { title, description, location } = req.body;
    const image = req.file ? req.file.path : null;
    const newItem = new MarketPlaceItem({
        title, description, location, image, user: req.user.userId
    });
    await newItem.save();
    res.status(201).json(newItem);
};

exports.getApprovedItems = async (req, res) => {
    const items = await MarketPlaceItem.find({ status: 'approved' }).populate('user', 'name email phone');
    res.json(items);
};
