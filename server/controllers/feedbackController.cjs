const csv = require('csvtojson');
const Question = require('../models/FeedbackQuestions.cjs');
const FeedbackResponse = require('../models/FeedbackResponse.cjs');
const ProcessedFeedback = require('../models/ProcessedFeedback.cjs');


const importQuestions = async (req, res) => {

  try {

    const jsonArray = await csv().fromFile(req.file.path);
    Question.insertMany(jsonArray);
    res.send({ status: 200, success: true, msg: 'Running' });

  } catch (error) {
    res.send({ status: 400, success: false, msg: error.message });
  }
}


const changeQuestions = async (req, res) => {

  try {

    const jsonArray = await csv().fromFile(req.file.path);
    await Question.deleteMany({});
    Question.insertMany(jsonArray);
    res.send({ status: 200, success: true, msg: 'Running' });

  } catch (error) {
    res.send({ status: 400, success: false, msg: error.message });
  }
}

const fetchQuestions = async (req, res) => {

  try {
    const questions = await Question.find();
    res.json(questions.map(question => question.Question));
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}



const submitFeedback = async (req, res) => {
  try {
    // Receive feedback data from the client
    const feedbackData = req.body;

    // Parse and save the feedback data
    await Promise.all(feedbackData.map(async feedbackItem => {
      // Extract data from the feedback item
      const { StudentID, FacultyName, Feedback } = feedbackItem;

      // Create a new feedback response instance
      const feedbackResponse = new FeedbackResponse({
        StudentID,
        FacultyName,
        Feedback
      });

      // Save the feedback response to the database
      await feedbackResponse.save();
    }));

    // Send success response
    res.status(200).json({ success: true, message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};



const getProcessedFeedback = async (req, res) => {
  const facultyName = req.params.facultyName;
    try {
        // Fetch processed feedback for the given faculty name
        const feedback = await ProcessedFeedback.find({ FacultyName: facultyName });

        // Send the processed feedback as response
        res.status(200).json(feedback);
    } catch (error) {
        console.error('Error fetching processed feedback:', error);
        res.status(500).json({ error: 'Error fetching processed feedback' });
    }

};


// Route to check if feedback exists for a given studentID
const isFeedbackSubmitted = async (req, res) => {
  const studentID = req.params.studentID;

  try {
    // Check if feedback exists for the given studentID
    const feedbackExists = await FeedbackResponse.exists({ StudentID: studentID });
    if (!feedbackExists) {
      return res.json(false);
    }
    res.json(true);
  } catch (error) {
    console.error('Error checking feedback existence:', error);
    res.status(500).json({ error: 'An error occurred while checking feedback existence' });
  }
};


const { summarizeText, sentimentScore } = require('./summarization.cjs');

const processFeedback = async(req, res) => {
    try {
        // Fetch all feedback responses
        const allFeedbackResponses = await FeedbackResponse.find();

        // Group feedback by faculty name and course name
        const groupedFeedback = {};
        allFeedbackResponses.forEach(feedback => {
            if (!groupedFeedback[feedback.FacultyName]) {
                groupedFeedback[feedback.FacultyName] = {};
            }
            feedback.Feedback.forEach(courseFeedback => {
                const courseName = courseFeedback.courseName;
                if (!groupedFeedback[feedback.FacultyName][courseName]) {
                    groupedFeedback[feedback.FacultyName][courseName] = {
                        questionWiseRatings: {},
                        labComments: [],
                        facultyComments: []
                    };
                }
                // Check if the feedback is for a lab
                if (courseFeedback.ratings.length === 0) {
                    // If it's a lab, only collect lab comments and faculty comments
                    if (courseFeedback.labComment) {
                        groupedFeedback[feedback.FacultyName][courseName].labComments.push(courseFeedback.labComment);
                    }
                    if (courseFeedback.facultyComment) {
                        groupedFeedback[feedback.FacultyName][courseName].facultyComments.push(courseFeedback.facultyComment);
                    }
                } else {
                    // If it's a course with question-wise ratings, process ratings as usual
                    courseFeedback.ratings.forEach(rating => {
                        const QNO = rating.QNO;
                        if (!groupedFeedback[feedback.FacultyName][courseName].questionWiseRatings[QNO]) {
                            groupedFeedback[feedback.FacultyName][courseName].questionWiseRatings[QNO] = {
                                totalRating: 0,
                                count: 0
                            };
                        }
                        groupedFeedback[feedback.FacultyName][courseName].questionWiseRatings[QNO].totalRating += rating.Rating;
                        groupedFeedback[feedback.FacultyName][courseName].questionWiseRatings[QNO].count++;
                    });
                    // Collect lab comments and faculty comments for courses
                    if (courseFeedback.labComment) {
                        groupedFeedback[feedback.FacultyName][courseName].labComments.push(courseFeedback.labComment);
                    }
                    if (courseFeedback.facultyComment) {
                        groupedFeedback[feedback.FacultyName][courseName].facultyComments.push(courseFeedback.facultyComment);
                    }
                }
            });
        });

        // Process lab comments and faculty comments using summarizeText and sentimentScore functions
        const processedFeedback = [];
        for (const facultyName in groupedFeedback) {
            const facultyFeedback = [];
            for (const courseName in groupedFeedback[facultyName]) {
                const feedbackData = groupedFeedback[facultyName][courseName];
                const questionWiseRatings = [];
                // Check if there are any question-wise ratings for this course
                if (Object.keys(feedbackData.questionWiseRatings).length > 0) {
                    for (const QNO in feedbackData.questionWiseRatings) {
                        const totalRating = feedbackData.questionWiseRatings[QNO].totalRating;
                        const count = feedbackData.questionWiseRatings[QNO].count;
                        const averageRating = totalRating / count;
                        questionWiseRatings.push({ QNO: parseInt(QNO), averageRating });
                    }
                }

                // Summarize lab comments
                const summarizedLabComments = await summarizeText(feedbackData.labComments.join('. '));

                // Summarize faculty comments
                const summarizedFacultyComments = await summarizeText(feedbackData.facultyComments.join('. '));

                // Calculate sentiment score for lab comments
                const labSentiment = await sentimentScore(feedbackData.labComments.join('. '));

                // Calculate sentiment score for faculty comments
                const facultySentiment = await sentimentScore(feedbackData.facultyComments.join('. '));

                facultyFeedback.push({
                    courseName: courseName,
                    questionWiseRatings: questionWiseRatings,
                    labComments: summarizedLabComments,
                    facultyComments: summarizedFacultyComments,
                    labSentiment: labSentiment,
                    facultySentiment: facultySentiment
                });
            }
            processedFeedback.push({
                FacultyName: facultyName,
                Feedback: facultyFeedback
            });
        }

        // Store processed feedback in the ProcessedFeedback collection
        await ProcessedFeedback.insertMany(processedFeedback);
        console.log("Feedback processed and stored successfully!");
        res.status(200).json({ success: true, message: "Feedback processed and stored successfully!" });
    } catch (error) {
        console.error("Error processing feedback:", error);
        res.status(500).json({ error: "Error processing feedback" });
    }
};



module.exports = { importQuestions, changeQuestions, fetchQuestions, submitFeedback, isFeedbackSubmitted, processFeedback, getProcessedFeedback };