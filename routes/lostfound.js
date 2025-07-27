const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { postItem, getApprovedItems } = require('../controllers/lostFoundController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/', auth, upload.single('image'), postItem);
router.get('/', getApprovedItems);
// ...admin approval/reject routes as well

module.exports = router;
