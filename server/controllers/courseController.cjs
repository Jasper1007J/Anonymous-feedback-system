const csv = require('csvtojson');
const bcrypt = require('bcrypt');
const Course = require('../models/Course.cjs');
const HOD = require('../models/HOD.cjs');

const importCourse = async (req, res) => {

  try {

    const jsonArray = await csv().fromFile(req.file.path);
    // Course.insertMany(jsonArray);

    for (const entry of jsonArray) {
      // Split the courses string by commas to get individual courses
      const courses = entry.Courses.split(',');
      const labs = entry.Labs.split(',');

      // Create a new Course document with the parsed data
      const course = new Course({
        Department: entry.Department,
        Semester: entry.Semester,
        Courses: courses,
        Labs: labs
      });

      // Save the course document to the database
      await course.save();
    }

    // Get unique department names from the courses collection
    const uniqueDepartments = await Course.distinct('Department');

    // Create and insert data into the hod collection
    for (const department of uniqueDepartments) {
      // Generate HOD name based on department name
      const hodName = `${department}_HOD`;
      // Default password for HOD
      const password = 'password';

      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new HOD document
      const hod = new HOD({
        Name: hodName,
        Password: hashedPassword,
        Department: department,
        AccessGiven: false
      });

      // Save the HOD document to the database
      await hod.save();
    }

    res.send({ status: 200, success: true, msg: { jsonArray } });

  } catch (error) {
    res.send({ status: 400, success: false, msg: error.message });
  }
}


const fs = require('fs');
const path = require('path');

const getUploadedCourseFiles = async (req, res) => {
  const uploadsDirectory = './uploads/courseData';
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

// Route to fetch courses based on semester and department
const fetchCourseDetails = async (req, res) => {
  try {
    const { semester, department } = req.params;
    const courses = await Course.find({ Semester: semester, Department: department });

    // Extract course names from the courses array
    const courseNames = courses.map(course => course.Courses).flat();

    res.json(courseNames);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Route to fetch labs based on semester and department
const fetchLabDetails = async (req, res) => {
  try {
    const { semester, department } = req.params;
    const labs = await Course.find({ Semester: semester, Department: department });

    // Extract labs names from the Labs array
    const LabNames = labs.map(lab => lab.Labs).flat();

    res.json(LabNames);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = { importCourse, getUploadedCourseFiles, fetchCourseDetails, fetchLabDetails };