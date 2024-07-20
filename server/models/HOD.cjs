const mongoose = require('mongoose');

const hodSchema = new mongoose.Schema({

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
    required: true,
    unique: true
  },
  AccessGiven: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model('HOD', hodSchema);