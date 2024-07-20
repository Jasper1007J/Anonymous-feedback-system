const express = require('express');
const facultyRouter = express.Router();


const multer = require('multer');
const facultyController = require('../controllers/facultyController.cjs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/facultyData');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage
})


facultyRouter.route('/uploadfacultyData').post((upload.single("facultyFile")), facultyController.importFaculty);
facultyRouter.get('/getUploadedFacultyFiles', facultyController.getUploadedFacultyFiles);
facultyRouter.get('/:department/:courses', facultyController.fetchFacultyDetails);
facultyRouter.get('/:facultyName', facultyController.fetchProfile);
facultyRouter.post('/authenticateFaculty', facultyController.authenticateFaculty);
facultyRouter.post('/changePassword', facultyController.changePassword);

module.exports = facultyRouter;