const csv = require('csvtojson');
const Faculty = require('../models/Faculty.cjs');
const fs = require('fs');
const bcrypt = require('bcrypt');

const importFaculty = async (req, res) => {

  try {

    const jsonArray = await csv().fromFile(req.file.path);
    // Course.insertMany(jsonArray);

    for (const entry of jsonArray) {

      // Hashing the password
      const hashedPassword = await bcrypt.hash('password', 10);

      // Split the courses string by commas to get individual courses
      const courses = entry.CoursesAssigned.split(',');

      // Create a new Course document with the parsed data
      const faculty = new Faculty({
        Name: entry.Name,
        Password: hashedPassword,
        Department: entry.Department,
        CoursesAssigned: courses
      });

      // Save the course document to the database
      await faculty.save();
    }
    res.send({ status: 200, success: true, msg: { jsonArray } });

  } catch (error) {
    res.send({ status: 400, success: false, msg: error.message });
  }
}

const getUploadedFacultyFiles = async (req, res) => {
  const uploadsDirectory = './uploads/facultyData';
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


// Controller function to authenticate faculty user
const authenticateFaculty = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the faculty user by username
    const faculty = await Faculty.findOne({ Name: username });

    // If faculty user not found, return error
    if (!faculty) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Compare the provided password with the hashed password stored in the database
    const isPasswordMatch = await bcrypt.compare(password, faculty.Password);

    // If passwords don't match, return error
    if (!isPasswordMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // If authentication successful, return faculty user data (you may want to omit sensitive data like password)
    res.send({ status: 200, success: true, msg: 'Authentication Successful' });


  } catch (error) {
    console.error('Error authenticating faculty:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Route to fetch faculty details based on department and courses assigned
const fetchFacultyDetails = async (req, res) => {
  try {
    const { department, courses } = req.params;

    // Split the courses associated with the current semester
    const currentSemesterCourses = courses.split(',');

    // Find faculty members whose assigned courses intersect with the current semester courses
    const faculty = await Faculty.find(
      { Department: department, CoursesAssigned: { $in: currentSemesterCourses } })
      .populate('CoursesAssigned');

    // Filter each faculty member's assigned courses to include only those in the current semester
    const filteredFaculty = faculty.map(({ Name, CoursesAssigned }) => ({
      name: Name,
      coursesAssigned: CoursesAssigned.filter(course => currentSemesterCourses.includes(course))
    }));

    res.json(filteredFaculty);
  } catch (error) {
    console.error('Error fetching faculty details:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const fetchProfile = async(req, res) => {

  const {facultyName} = req.params;

  try {
    const faculty = await Faculty.findOne({ Name: facultyName });

    if (!faculty) {
      return res.status(404).json({ message: 'Faculty not found' });
    }

    const { Department, CoursesAssigned } = faculty;

    res.status(200).json({ Department, CoursesAssigned });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

}

const changePassword = async (req, res) => {
  
  const { facultyName, oldPassword, newPassword, confirmPassword } = req.body;

  try {
    // Find faculty by ID
    const faculty = await Faculty.findOne({Name: facultyName});

    if (!faculty) {
      return res.status(404).json({ error: 'Faculty not found' });
    }

    // Check if old password matches
    const isMatch = await bcrypt.compare(oldPassword, faculty.Password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Incorrect old password' });
    }

    // Check if new password and confirm new password match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ error: 'New password and confirm new password do not match' });
    }

    // Hash the new password before storing
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update faculty's password in the database
    faculty.Password = hashedPassword;
    await faculty.save();

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};





module.exports = { importFaculty, getUploadedFacultyFiles, authenticateFaculty, fetchFacultyDetails, fetchProfile, changePassword }