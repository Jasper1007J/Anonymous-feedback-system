const mongoose = require('mongoose');

var questionSchema = new mongoose.Schema({

    Qno: {
        type: Number,
        required: true
    },
    Question: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Question', questionSchema);