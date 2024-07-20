const bcrypt = require('bcrypt');
const Hod = require('../models/HOD.cjs');
const Faculty = require('../models/Faculty.cjs');


// Controller function to authenticate faculty user
const authenticateHod = async (req, res) => {
  try {
    const { username, password } = req.body;

    const hod = await Hod.findOne({ Name: username });

    if (!hod) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const isPasswordMatch = await bcrypt.compare(password, hod.Password);

    if (!isPasswordMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    res.send({ status: 200, success: true, msg: 'Authentication Successful' });

  } catch (error) {
    console.error('Error authenticating faculty:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const fetchFacultyList = async (req, res) => {
  try {
    const { username } = req.body;

    const hod = await Hod.findOne({ Name: username });

    if (!hod) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const department = hod.Department;
    // console.log(department);

    const facultyList = await Faculty.find({ Department: department });

    if (!facultyList) {
      return res.status(401).json({ error: 'No Faculty Details Found' });
    }

    res.json(facultyList.map(faculty => faculty.Name).flat());


  } catch (error) {
    console.error('Error fetching details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

const fetchProfile = async (req, res) => {

  const { hodName } = req.params;

  try {
    const hod = await Hod.findOne({ Name: hodName });

    if (!hod) {
      return res.status(404).json({ message: 'Faculty not found' });
    }

    const { Department, AccessGiven } = hod;

    res.status(200).json({ Department, AccessGiven });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

}



const changePassword = async (req, res) => {

  const { hodName, oldPassword, newPassword, confirmPassword } = req.body;

  try {
    // Find faculty by ID
    const hod = await Hod.findOne({ Name: hodName });

    if (!hod) {
      return res.status(404).json({ error: 'HOD not found' });
    }

    // Check if old password matches
    const isMatch = await bcrypt.compare(oldPassword, hod.Password);
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
    hod.Password = hashedPassword;
    await hod.save();

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};


const toggleAccess = async (req, res) => {
  const { hodName } = req.body;

  try {
    const hod = await Hod.findOne({ Name: hodName });

    if (!hod) {
      return res.status(404).json({ error: 'HOD not found' });
    }

    hod.AccessGiven = !hod.AccessGiven; // Toggle accessGiven
    await hod.save();

    res.status(200).json({ accessGiven: hod.AccessGiven });
  } catch (error) {
    console.error('Error toggling access:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const getAccess = async (req, res) => {
  const department = req.params.department;
  try {
    const hod = await Hod.findOne({ Department: department });
    if (!hod) {
      return res.status(404).json({ error: 'HOD not found' });
    }

    res.status(200).json({ hasAccess: hod.AccessGiven });
  } catch (error) {
    console.error('Error fetching access:', error);
    res.status(500).json({ error: 'Server error' });
  }
};




module.exports = { authenticateHod, fetchFacultyList, fetchProfile, changePassword, toggleAccess, getAccess }