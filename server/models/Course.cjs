const mongoose = require('mongoose');

var CourseSchema = new mongoose.Schema({

    Department: {
        type: String,
        required: true
    },
    Semester: {
        type: String,
        required: true
    },
    Courses: [{
        type: String,
        required: true
    }],
    Labs: [{
        type: String,
        required: true
    }]
});

module.exports = mongoose.model('Course', CourseSchema);