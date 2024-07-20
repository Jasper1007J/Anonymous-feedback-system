const mongoose = require('mongoose');

const feedbackResponseSchema = mongoose.Schema({

    StudentID: {
        type: String,
        required: true
    },

    FacultyName: {
        type: String,
        required: true
    },

    Feedback: [{
        courseName: {
            type: String
        },
        ratings: [{
            QNO: {
                type: Number
            },
            Rating: {
                type: Number
            }
        }],
        labComment: {
            type: String
        },
        facultyComment: {
            type: String,
            required: true
        }
    }]

})

module.exports = mongoose.model('FeedbackResponse', feedbackResponseSchema);