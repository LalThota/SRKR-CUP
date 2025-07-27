const mongoose = require('mongoose');
const MarketplaceItemSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    contact: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    datePosted: { type: Date, default: Date.now },
    image: String
});
module.exports = mongoose.model('MarketplaceItem', MarketplaceItemSchema);
