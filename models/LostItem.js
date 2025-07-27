const mongoose = require('mongoose');
const LostItemSchema = new mongoose.Schema({
    title: String,
    description: String,
    location: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    datePosted: { type: Date, default: Date.now },
    image: String
});
module.exports = mongoose.model('LostItem', LostItemSchema);
