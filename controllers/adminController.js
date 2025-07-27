const LostItem = require('../models/LostItem');
const User = require('../models/User');

exports.approveLostItem = async (req, res) => {
    const item = await LostItem.findByIdAndUpdate(req.params.id, { status: 'approved' }, { new: true });
    res.json(item);
};

exports.rejectLostItem = async (req, res) => {
    const item = await LostItem.findByIdAndUpdate(req.params.id, { status: 'rejected' }, { new: true });
    res.json(item);
};

exports.deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted.' });
};

exports.addAdmin = (req, res) => {
    // your code here
    res.status(200).send("Admin created");
};