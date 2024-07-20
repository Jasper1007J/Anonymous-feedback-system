const mongoose = require('mongoose');

const processedFeedbackSchema = mongoose.Schema({
    FacultyName: {
        type: String,
        required: true
    },

    Feedback: [{
        courseName: {
            type: String
        },
        questionWiseRatings: [{
            QNO: {
                type: Number
            },
            averageRating: {
                type: Number
            }
        }],
        labComments: {
            type: [String]
        },
        facultyComments: {
            type: [String]
        },
        labSentiment: {
            type: Object // Object to store sentiment scores for lab comments
        },
        facultySentiment: [{
            label: {
                type: String
            },
            score: {
                type: Number
            }
        }]
    }]
});

module.exports = mongoose.model('ProcessedFeedback', processedFeedbackSchema);
