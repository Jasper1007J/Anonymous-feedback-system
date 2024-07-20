const express = require('express');
const studentRouter = express.Router();


const multer = require('multer');
const studentController = require('../controllers/studentController.cjs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/studentData');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage
})


studentRouter.route('/uploadStudentData').post((upload.single("file")), studentController.importStudent);
studentRouter.get('/getUploadedFiles', studentController.getUploadedFiles);
studentRouter.post('/validateRollNumber', studentController.validateRollNumber);
studentRouter.get('/:rollNumber', studentController.fetchStudentDetails);

module.exports = studentRouter;