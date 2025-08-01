const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
    addAdmin,
    approveLostItem,
    rejectLostItem,
    approveMarketplaceItem,
    rejectMarketplaceItem,
    approveNote,
    rejectNote,
    deleteUser
} = require('../controllers/adminController');

// Admin user management
router.post('/add-admin', auth, addAdmin);
router.delete('/users/:id', auth, deleteUser);

// Lost and found item approval routes
router.post('/lostfound/:id/approve', auth, approveLostItem);
router.post('/lostfound/:id/reject', auth, rejectLostItem);

// Marketplace item approval routes
router.post('/marketplace/:id/approve', auth, approveMarketplaceItem);
router.post('/marketplace/:id/reject', auth, rejectMarketplaceItem);

// Notes approval routes
router.post('/notes/:id/approve', auth, approveNote);
router.post('/notes/:id/reject', auth, rejectNote);

module.exports = router;