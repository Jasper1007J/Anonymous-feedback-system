import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './AccessFeedbacks.css';
import { Bar } from 'react-chartjs-2';
import {
    Chart,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from 'chart.js';
import { useReactToPrint } from 'react-to-print';

Chart.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
)

function AccessFeedbacks({ facultyName }) {
    const pdf = useRef();
    const [processedFeedback, setProcessedFeedback] = useState([]);
    const [questions, setQuestions] = useState([]);

    console.log(processedFeedback);

    useEffect(() => {
        const fetchProcessedFeedback = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/feedback/${facultyName}`);
                setProcessedFeedback(response.data);
            } catch (error) {
                console.error('Error fetching processed feedback:', error);
            }
        };

        fetchProcessedFeedback();
    }, [facultyName]);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get('http://localhost:5000/feedback/fetchQuestions');
                setQuestions(response.data);
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };

        fetchQuestions();
    }, []);

    const hasQuestionWiseRatings = (courseFeedback) => {
        return courseFeedback && courseFeedback.questionWiseRatings && courseFeedback.questionWiseRatings.some(rating => rating.averageRating !== 0);
    };

    const generatePdf = useReactToPrint({
        content: () => pdf.current,
        documentTitle: "FeedbackReport"
    });

    const data = {
        labels: questions.map(question => question), // Dynamically generate labels from questions
        datasets: processedFeedback.flatMap(feedback =>
            feedback.Feedback.map(courseFeedback => ({
                label: courseFeedback.courseName,
                data: courseFeedback.questionWiseRatings.map(rating => rating.averageRating), // Dynamically generate average ratings
                backgroundColor: function (context) {
                    const index = context.dataIndex;
                    const value = context.dataset.data[index];
                    if (value >= 0 && value <= 1) {
                        return 'darkred';    // Dark red for ratings <= 1
                    } else if (value > 1 && value <= 2) {
                        return 'rgb(193, 47, 76)'; // Light red for ratings <= 2
                    } else if (value > 2 && value <= 3) {
                        return 'rgb(255, 255, 65)';     // Yellow for ratings <= 3
                    } else if (value > 3 && value <= 4) {
                        return 'rgb(23, 172, 110)';  // Light green for ratings <= 4
                    } else {
                        return 'green';   // Dark green for ratings <= 5
                    }
                }
            }))
        )
    }

    const options = {
        indexAxis: 'y',
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Average Rating',
                    color: 'black'
                },
                ticks: {
                    color: 'black',
                    stepSize: 1,
                    suggestedMin: 0,
                    suggestedMax: 5 // Fixed typo here, changed "syggestedMax" to "suggestedMax"
                }
            },
            y: {
                title: {
                    display: true,
                    color: 'black'
                },
                ticks: {
                    color: 'black',
                    font: {
                        size: 10
                    }
                },
                offset: true
            }
        },
        plugins: {
            legend: {
                display: false
            }
        },

        barPercentage: 0.8,
        categoryPercentage: 1
    }

    return (
        <div className='access-feedbacks-main-container' ref={pdf}>
            {processedFeedback.length > 0 ? (
                processedFeedback.map((feedback, index) => (
                    <div key={index}>
                        {feedback.Feedback.map((courseFeedback, idx) => (
                            <div key={idx} className='course-feedback-container'>
                                <h4>{courseFeedback.courseName}</h4>
                                {hasQuestionWiseRatings(courseFeedback) ? (
                                    <React.Fragment>
                                        <div className='chart-container'><Bar data={data} options={options} className='bar-chart' width="1200" height="450" /></div>
                                        <p>Faculty Comments: {courseFeedback.facultyComments}</p>
                                        {courseFeedback.facultySentiment && courseFeedback.facultySentiment.map((sentiment, i) => (
                                            <div key={i}>
                                                <p>Faculty Sentiment Score: {sentiment.score}</p>
                                                <p>Faculty Sentiment Label: {sentiment.label}</p>
                                            </div>
                                        ))}
                                    </React.Fragment>
                                ) : (
                                    <React.Fragment>
                                        <p>Lab Comments: {courseFeedback.labComments}</p>
                                        {courseFeedback.labSentiment && courseFeedback.labSentiment.map((sentiment, i) => (
                                            <div key={i}>
                                                <p>Lab Sentiment Score: {sentiment.score}</p>
                                                <p>Lab Sentiment Label: {sentiment.label}</p>
                                            </div>
                                        ))}
                                    </React.Fragment>
                                )}

                            </div>
                        ))}
                    </div>
                ))
            ) : (
                <h4 style={{color: 'rgb(248, 84, 111)'}}>No processed feedback available.</h4>
            )}

            <button className='btn btn-primary download-report' onClick={generatePdf}>Download Report</button>
        </div>
    );
}

export default AccessFeedbacks;
