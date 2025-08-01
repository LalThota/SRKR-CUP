const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    message: { 
        type: String, 
        required: true 
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    type: { 
        type: String, 
        enum: ['system', 'user', 'approval', 'rejection'], 
        default: 'system' 
    },
    read: { 
        type: Boolean, 
        default: false 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

// Index for faster queries
NotificationSchema.index({ user: 1, read: 1, createdAt: -1 });

module.exports = mongoose.model('Notification', NotificationSchema);