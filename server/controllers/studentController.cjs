const csv = require('csvtojson');
const Student = require('../models/Student.cjs');


const importStudent = async (req, res) => {

    try {

        const jsonArray = await csv().fromFile(req.file.path);
        Student.insertMany(jsonArray);
        res.send({ status: 200, success: true, msg: 'Running' });

    } catch (error) {
        res.send({ status: 400, success: false, msg: error.message });
    }
}


const fs = require('fs');
const path = require('path');

const getUploadedFiles = async (req, res) => {
  const uploadsDirectory = './uploads/studentData';
  try {
    // Read the contents of the 'uploads' folder
    const files = await fs.readdirSync(uploadsDirectory);
    // res.send({ status: 200, success: true, msg: 'Running' });
    res.send(files);
    return files;

  } catch (error) {
    console.error('Error reading uploads directory:', error);
    res.send({ status: 400, success: false, msg: error.message });
    return [];

  }
};


// Controller function to validate the roll number
const validateRollNumber = async (req, res) => {
  try {
    const { rollNumber } = req.body; // Destructure rollNumber from req.body
    const student = await Student.findOne({ RollNumber: rollNumber });
    if (student) {
      res.status(200).json({ success: true, message: 'Valid roll number.' });
    } else {
      res.status(400).json({ success: false, message: 'Invalid roll number.' });
    }
  } catch (error) {
    // If an error occurs, return an error response
    console.error('Error validating roll number:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

// Route to fetch student details based on roll number
const fetchStudentDetails = async (req, res) => {
  try {
    const { rollNumber } = req.params;
    const student = await Student.findOne({ RollNumber: rollNumber });

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Return relevant student details
    res.json({
      semester: student.Semester,
      department: student.Department
    });
  } catch (error) {
    console.error('Error fetching student details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = { importStudent, getUploadedFiles, validateRollNumber, fetchStudentDetails };