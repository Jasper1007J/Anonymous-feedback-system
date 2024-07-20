import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import './FeedbackForm.css';
import axios from 'axios';

function FeedbackForm({ courses, labs, faculties, questions, studentID }) {
   console.log(faculties);
   const [feedback, setFeedback] = useState([]);
   const [labComments, setLabComments] = useState(Array(labs.length).fill(''));
   const [facultyComments, setFacultyComments] = useState(Array(faculties.length).fill(''));
   const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
   const [isAlreadySubmitted, setIsAlreadySubmitted] = useState(false);

   console.log(isAlreadySubmitted);

   // console.log(feedbackSubmitted);

   useEffect(() => {
      // Initialize the feedback state based on the number of questions
      setFeedback(Array(questions.length).fill('').map(() => Array(courses.length).fill('')));
   }, [questions, courses]);


   // Check if feedback has already been submitted by the student
   useEffect(() => {
      const checkFeedbackSubmission = async () => {


         try {
            const response = await axios.get(`http://localhost:5000/feedback/isFeedbackSubmitted/${studentID}`);
            setIsAlreadySubmitted(response.data);
            console.log("checkFeedbackSUbmission called");
            console.log(response.data);
         } catch (error) {
            console.error('Error checking feedback submission:', error);
         }
      };

      checkFeedbackSubmission();
   }, [studentID]);



   const handleSubmit = async (e) => {
      e.preventDefault();

      const isConfirmed = window.confirm("Are you sure you want to submit the form?");
      if (!isConfirmed) {
         return;
      }

      try {

         // Check if faculties array exists and is not empty
         if (!faculties || faculties.length === 0) {
            console.error('No faculties found.');
            return;
         }
         // Prepare feedback data
         const feedbackData = faculties.flatMap((faculty, facultyIndex) => {
            // Get the courses associated with the current faculty
            const facultyCourses = faculty.coursesAssigned;
            console.log(facultyCourses);
            // Initialize feedback object for the current faculty
            const facultyFeedback = {
               StudentID: studentID,
               FacultyName: faculty.name,
               Feedback: []
            };
            // Iterate over the courses assigned to the faculty
            facultyCourses.forEach(course => {
               // Find the index of the course in the courses array
               const courseIndex = courses.indexOf(course);
               const labIndex = labs.findIndex(lab => lab === course);
               if (courseIndex !== -1) { // Course found
                  // Construct feedback object for the course
                  console.log(faculty.name);
                  // Construct feedback object for the course
                  const courseFeedback = {
                     courseName: course,
                     ratings: questions.map((_, questionIndex) => ({
                        QNO: questionIndex + 1,
                        Rating: parseInt(feedback[questionIndex][courseIndex])
                     })),
                     labComment: labComments[labIndex] || '', // Check if labIndex is valid
                     facultyComment: facultyComments[facultyIndex] || ''
                  };
                  // Push course feedback to the faculty's feedback array
                  facultyFeedback.Feedback.push(courseFeedback);
               } else {
                  const courseFeedback = {
                     courseName: labs[labIndex],
                     ratings: questions.map((_, questionIndex) => ({
                        QNO: questionIndex + 1,
                        Rating: null
                     })),
                     labComment: labComments[labIndex] || '',
                     facultyComment: facultyComments[facultyIndex] || ''
                  };

                  // Change 'No lab Comment' to empty string if lab comment is empty
                  if (labIndex >= 0 && labComments[labIndex].trim() === 'No lab Comment') {
                     courseFeedback.labComment = '';
                  }

                  facultyFeedback.Feedback.push(courseFeedback);
               }
            });
            return facultyFeedback;
         });


         console.log(feedbackData);
         // Send data to backend
         const response = await axios.post('http://localhost:5000/feedback/submitFeedback', feedbackData);

         // Handle success response
         console.log('Feedback submitted successfully:', response.data);

         // Clear form inputs
         setFeedback(Array(10).fill('').map(() => Array(courses.length).fill('')));
         setLabComments(Array(labs.length).fill(''));
         setFacultyComments(Array(faculties.length).fill(''));

         alert("Feedback submitted successfully!");
         setFeedbackSubmitted(true);
         // window.location.reload();

      } catch (error) {
         // Handle error
         console.error('Error submitting feedback:', error);
      }

   };

   return (
      <div className="feedback-form">
         {isAlreadySubmitted ? (
            <div><h2>You Have Already Submitted the Feedback</h2> <h2><center>Thank You!!!</center></h2></div>
         ) : (
            feedbackSubmitted ? (
               <div>
                  <h2>Thank You For Your Feedback!</h2>
                  <h2><center>Feedback Submitted Successfully</center></h2>
               </div>
            ) : (
               <form onSubmit={handleSubmit}>
                  <div>
                     <center><h1>Feedback Form</h1></center>
                     <table>
                        <thead>
                           <tr style={{ float: 'right' }}>
                              <th className='empty-one'></th>
                              {courses.map((course, index) => (
                                 <th key={index} className='subject-names'>{course}</th>
                              ))}
                           </tr>
                        </thead>
                        <tbody>
                           {questions.map((question, questionIndex) => (
                              <tr key={questionIndex} className='table-row'>
                                 <th className='questions'> <td className='rating-row'>{questionIndex + 1}. {question}</td></th>
                                 <th className='dropdowns'> {courses.map((course, courseIndex) => (
                                    <td key={courseIndex} >
                                       <Form.Control
                                          as="select"
                                          value={feedback[questionIndex][courseIndex]}
                                          className='rating'
                                          onChange={(e) => {
                                             const newFeedback = [...feedback];
                                             newFeedback[questionIndex][courseIndex] = e.target.value;
                                             setFeedback(newFeedback);
                                          }}
                                          required
                                       >
                                          <option value="">Rate</option>
                                          <option value="1">1</option>
                                          <option value="2">2</option>
                                          <option value="3">3</option>
                                          <option value="4">4</option>
                                          <option value="5">5</option>
                                       </Form.Control>
                                    </td>
                                 ))}</th>

                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
                  <br />
                  <div>
                     {labs.map((lab, labIndex) => (
                        <div key={labIndex}>
                           <label> Comment on {lab}:</label>
                           <Form.Control
                              as="textarea"
                              type='text'
                              className='subject-textarea'
                              value={labComments[labIndex]}
                              onChange={(e) => {
                                 const newComments = [...labComments];
                                 newComments[labIndex] = e.target.value;
                                 setLabComments(newComments);
                              }}
                              minLength={5}
                              required
                           />
                        </div>
                     ))}
                  </div>
                  <br />
                  <div>
                     {faculties.map((faculty, facultyIndex) => (
                        <div key={facultyIndex}>
                           <label> Comment on {faculty.name}:</label>
                           <Form.Control
                              as="textarea"
                              type='text'
                              className='subject-textarea'
                              value={facultyComments[facultyIndex]}
                              onChange={(e) => {
                                 const newComments = [...facultyComments];
                                 newComments[facultyIndex] = e.target.value;
                                 setFacultyComments(newComments);
                              }}
                              minLength={5}
                              required
                           />
                        </div>
                     ))}
                  </div>
                  <br />
                  <center><button type="submit" className='btn btn-secondary'>Submit</button></center>
               </form>
            )
         )}
      </div>
   );
}

export default FeedbackForm;
