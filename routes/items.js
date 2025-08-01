const express = require('express');

const { createItem, getUserItems, getAllItems, approveItem } = require('../controllers/itemController');

const auth = require('../middleware/auth');

const role = require('../middleware/role');

const router = express.Router();

router.post('/', auth, createItem);

router.get('/user', auth, getUserItems);

router.get('/all', auth, getAllItems);

router.put('/approve/:id', auth, role('admimn'), approveItem);

module.exports = router;