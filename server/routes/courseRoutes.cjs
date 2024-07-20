const express = require('express');
const courseRouter = express.Router();


const multer = require('multer');
const courseController = require('../controllers/courseController.cjs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/courseData');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage
})


courseRouter.route('/uploadCourseData').post((upload.single("courseFile")), courseController.importCourse);
courseRouter.get('/getUploadedCourseFiles', courseController.getUploadedCourseFiles);
courseRouter.get('/:semester/:department/courses', courseController.fetchCourseDetails);
courseRouter.get('/:semester/:department/labs', courseController.fetchLabDetails);

module.exports = courseRouter;