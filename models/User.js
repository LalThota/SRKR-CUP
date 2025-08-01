const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const express = require('express');

const { getProfile, getAllUsers } = require('../controllers/userController');

const auth = require('../middleware/auth');

const role = require('../middleware/role');

const router = express.Router();

router.get('/profile', auth, getProfile);
router.get('/all', auth, role('admin'), getAllUsers);
const UserSchema = new mongoose.Schema({
    name: String,
    regdNo: String,
    email: { type: String, unique: true },
    password: String,
    phone: String,
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    joinDate: { type: Date, default: Date.now },
    isVerified: { type: Boolean, default: false },
    otp: String,
    otpExpiry: Date,
    passwordReset: { type: Boolean, default: false }
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

UserSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);