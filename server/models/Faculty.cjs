const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({

  Name: {
    type: String,
    required: true
  },

  Password: {
    type: String,
    required: true
  },

  Department: {
    type: String,
    required: true
  },

  CoursesAssigned: [{
    type: String,
    required: true
  }]
});

module.exports = mongoose.model('Faculty', facultySchema);