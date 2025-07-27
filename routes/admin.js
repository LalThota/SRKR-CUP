const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
    addAdmin,
    approveLostItem,
    rejectLostItem,
    deleteUser
} = require('../controllers/adminController');

router.post('/add-admin', addAdmin);
router.post('/lostfound/:id/approve', auth, approveLostItem);
router.post('/lostfound/:id/reject', auth, rejectLostItem);
router.delete('/users/:id', auth, deleteUser);

module.exports = router;