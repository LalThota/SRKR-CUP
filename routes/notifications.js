const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const { 
    createNotification, 
    getUserNotifications, 
    getUnreadNotifications,
    markAsRead,
    markAllAsRead,
    getAllNotifications 
} = require('../controllers/notificationController');

// Create a new notification
router.post('/', auth, createNotification);

// Get user's notifications
router.get('/', auth, getUserNotifications);

// Get user's unread notifications
router.get('/unread', auth, getUnreadNotifications);

// Mark a notification as read
router.put('/:id/read', auth, markAsRead);

// Mark all notifications as read
router.put('/read-all', auth, markAllAsRead);

// Admin route to get all notifications
router.get('/all', auth, role('admin'), getAllNotifications);

module.exports = router;