const express = require('express');
const feedbackRouter = express.Router();


const multer = require('multer');
const feedbackController = require('../controllers/feedbackController.cjs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/questions');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage
})


feedbackRouter.route('/importQuestions').post((upload.single("questionsFile")), feedbackController.importQuestions);
feedbackRouter.route('/changeQuestions').post((upload.single("questionsFile")), feedbackController.changeQuestions);
feedbackRouter.get('/fetchQuestions', feedbackController.fetchQuestions);
feedbackRouter.post('/submitFeedback', feedbackController.submitFeedback);
feedbackRouter.get('/processFeedback', feedbackController.processFeedback);
feedbackRouter.get('/:facultyName', feedbackController.getProcessedFeedback);
feedbackRouter.get('/isFeedbackSubmitted/:studentID', feedbackController.isFeedbackSubmitted);

module.exports = feedbackRouter;