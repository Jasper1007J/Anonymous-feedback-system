const bcrypt = require('bcrypt')
const Admin = require('../models/Admin.cjs');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const saveAdmin = async (req, res) => {
    try {

        username = 'admin';
        password = 'password';
        // const hashedPassword = await bcrypt.hash(password, 10);

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ Name: username });
        if (existingAdmin) {
            console.log("Admin already exists");
            return;
        }

        const admin = new Admin({
            Name: username,
            Password: password,
        });

        await admin.save();

        console.log("Admin data saved");
    } catch (error) {
        console.error("Error saving admin data:", error);
    }
}


const authenticate = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find the admin by username
        const admin = await Admin.findOne({ Name: username });

        // Check if admin exists and compare passwords
        if (admin) {
            if (admin.Password === password) {
                res.status(200).send('Login successful');
            } else {
                res.status(401).json({ message: 'Invalid username or password' });
            }
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Error during authentication:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const changePassword = async (req, res) => {
    const { oldPassword, newPassword, confirmPassword } = req.body;

    try {
        // Check if the old password matches the current password in the database
        const admin = await Admin.findOne({ Name: 'admin' }); // Assuming 'admin' is the only admin user
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found.' });
        }

        const isMatch = oldPassword === admin.Password;
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid old password.' });
        }

        // Validate new password and confirmation
        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: 'New password and confirmation do not match.' });
        }


        // Update admin's password
        admin.Password = newPassword;
        await admin.save();

        res.status(200).json({ message: 'Password changed successfully.' });
    } catch (error) {
        console.error('Error changing password:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

const deleteAllData = async (req, res) => {
    try {
        // Delete all documents from all collections
        await mongoose.connection.collection('students').deleteMany({});
        await mongoose.connection.collection('courses').deleteMany({});
        await mongoose.connection.collection('faculties').deleteMany({});
        await mongoose.connection.collection('feedbackresponses').deleteMany({});
        await mongoose.connection.collection('processedfeedbacks').deleteMany({});

        // Delete uploaded files (assuming 'uploads' is the directory where files are uploaded)
        const studUploadsDir = './uploads/studentData';
        fs.readdir(studUploadsDir, (err, files) => {
            if (err) {
                console.error('Error reading directory:', err);
                return res.status(500).json({ message: 'Error deleting files.' });
            }
            // Iterate over files in the uploads directory and delete them
            for (const file of files) {
                fs.unlink(path.join(studUploadsDir, file), err => {
                    if (err) {
                        console.error('Error deleting file:', err);
                    }
                });
            }
        });

        const facUploadsDir = './uploads/facultyData';
        fs.readdir(facUploadsDir, (err, files) => {
            if (err) {
                console.error('Error reading directory:', err);
                return res.status(500).json({ message: 'Error deleting files.' });
            }
            // Iterate over files in the uploads directory and delete them
            for (const file of files) {
                fs.unlink(path.join(facUploadsDir, file), err => {
                    if (err) {
                        console.error('Error deleting file:', err);
                    }
                });
            }
        });

        const courseUploadsDir = './uploads/courseData';
        fs.readdir(courseUploadsDir, (err, files) => {
            if (err) {
                console.error('Error reading directory:', err);
                return res.status(500).json({ message: 'Error deleting files.' });
            }
            // Iterate over files in the uploads directory and delete them
            for (const file of files) {
                fs.unlink(path.join(courseUploadsDir, file), err => {
                    if (err) {
                        console.error('Error deleting file:', err);
                    }
                });
            }
        });

        return res.status(200).json({ message: 'All data and files deleted successfully.' });
    } catch (error) {
        console.error('Error deleting all data:', error);
        return res.status(500).json({ message: 'Error deleting all data.' });
    }
};

module.exports = { saveAdmin, changePassword, authenticate, deleteAllData }
