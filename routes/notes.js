const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { uploadNote, getApprovedNotes } = require('../controllers/notesController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/', auth, upload.single('file'), uploadNote);
router.get('/', getApprovedNotes);
module.exports = router;
