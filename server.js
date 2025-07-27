require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const path = require('path');
const app = express();

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error("❌ MONGO_URI is not defined in .env file");
    process.exit(1);
}

mongoose.connect(MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.error("❌ MongoDB connection failed:", err));

// Middleware
app.use(express.static('public'));
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/lostfound', require('./routes/lostfound'));
app.use('/api/marketplace', require('./routes/marketplace'));
app.use('/api/notes', require('./routes/notes'));
app.use('/api/admin', require('./routes/admin'));
app.use('/uploads', express.static('uploads'));

// Start server
const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => {
    res.send('🎉 API is running successfully!');
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

// Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

// (Optional) Send index.html on root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});