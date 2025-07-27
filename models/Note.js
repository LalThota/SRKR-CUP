const mongoose = require('mongoose');
const NoteSchema = new mongoose.Schema({
    title: String,
    subject: String,
    semester: String,
    description: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    dateUploaded: { type: Date, default: Date.now },
    fileName: String,
    fileUrl: String,
    fileSize: Number
});
module.exports = mongoose.model('Note', NoteSchema);
