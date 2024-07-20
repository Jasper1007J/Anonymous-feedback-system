const mongoose = require('mongoose');

var studentSchema = new mongoose.Schema({

    RollNumber: {
        type: String,
        required: true,
        unique: true
    },

    Name: {
        type: String,
        required: true
    },
    Department: {
        type: String,
        required: true
    },
    Semester: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Student', studentSchema);