const Note = require('../models/Note');

exports.uploadNote = async (req, res) => {
    const { title, subject, semester, description } = req.body;
    const file = req.file;
    if (!file) return res.status(400).json({ message: 'File required' });
    const newNote = new Note({
        title,
        subject,
        semester,
        description,
        user: req.user.userId,
        fileName: file.originalname,
        fileUrl: file.path,
        fileSize: file.size,
    });
    await newNote.save();
    res.status(201).json(newNote);
};

exports.getApprovedNotes = async (req, res) => {
    const notes = await Note.find({ status: 'approved' }).populate('user', 'name email');
    res.json(notes);
};
