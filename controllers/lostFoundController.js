const LostItem = require('../models/LostItem');

exports.postItem = async (req, res) => {
    const { title, description, location } = req.body;
    const image = req.file ? req.file.path : null;
    const newItem = new LostItem({
        title, description, location, image, user: req.user.userId
    });
    await newItem.save();
    res.status(201).json(newItem);
};

exports.getApprovedItems = async (req, res) => {
    const items = await LostItem.find({ status: 'approved' }).populate('user', 'name email phone');
    res.json(items);
};
