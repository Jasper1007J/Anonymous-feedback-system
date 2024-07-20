import React, { useState, useEffect } from 'react';
import './AddDataComponent.css';


const STUDENT_FILE_URL = "http://localhost:3000/sample_student_data_file.csv";
const FACULTY_FILE_URL = "http://localhost:3000/sample_faculty_data_file.csv";
const COURSE_FILE_URL = "http://localhost:3000/sample_courses_data_file.csv";
const QUESTION_FILE_URL = "http://localhost:3000/sample_questions_data_file.csv";

function AddDataComponent() {
  const [file, setFile] = useState(null);
  const [facultyFile, setFacultyFile] = useState(null);
  const [courseFile, setCourseFile] = useState(null);
  const [uploadedStudentFiles, setUploadedStudentFiles] = useState([]);
  const [uploadedFacultyFiles, setUploadedFacultyFiles] = useState([]);
  const [uploadedCourseFiles, setUploadedCourseFiles] = useState([]);
  const [questionsFile, setQuestionsFile] = useState([]);



  const downloadFile = (url) => {
    const fileName = url.split("/").pop();
    const aTag = document.createElement('a');
    aTag.href = url;
    aTag.setAttribute('download', fileName);
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
  }


  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      alert('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/student/uploadStudentData', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        alert('File uploaded successfully.');
        fetchUploadedFiles(); // Fetch uploaded files again after successful upload
      } else {
        alert('Error uploading file.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error uploading file.');
    }
  };

  useEffect(() => {
    fetchUploadedFiles();
  }, []);

  const fetchUploadedFiles = async () => {
    try {
      const response = await fetch('http://localhost:5000/student/getUploadedFiles');
      if (response.ok) {
        const files = await response.json();
        setUploadedStudentFiles(files);
      } else {
        console.error('Error fetching uploaded files:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching uploaded files:', error.message);
    }
  };



  const handleFacultyFileChange = (event) => {
    setFacultyFile(event.target.files[0]);
  };

  const handleFacultyFileSubmit = async (event) => {
    event.preventDefault();

    if (!facultyFile) {
      alert('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('facultyFile', facultyFile);

    try {
      const response = await fetch('http://localhost:5000/faculty/uploadFacultyData', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        alert('File uploaded successfully.');
        fetchUploadedFacultyFiles(); // Fetch uploaded files again after successful upload
      } else {
        alert('Error uploading file.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error uploading file.');
    }
  };

  useEffect(() => {
    fetchUploadedFacultyFiles();
  }, []);

  const fetchUploadedFacultyFiles = async () => {
    try {
      const response = await fetch('http://localhost:5000/faculty/getUploadedFacultyFiles');
      if (response.ok) {
        const files = await response.json();
        console.log(files);
        setUploadedFacultyFiles(files);
      } else {
        console.error('Error fetching uploaded files:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching uploaded files:', error.message);
    }
  };

  const handleCourseFileChange = (event) => {
    setCourseFile(event.target.files[0]);
  };

  const handleCourseSubmit = async (event) => {
    event.preventDefault();

    if (!courseFile) {
      alert('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('courseFile', courseFile);

    try {
      const response = await fetch('http://localhost:5000/course/uploadCourseData', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        alert('File uploaded successfully.');
        fetchUploadedCourseFiles(); // Fetch uploaded files again after successful upload
      } else {
        alert('Error uploading file.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error uploading file.');
    }
  };

  useEffect(() => {
    fetchUploadedCourseFiles();
  }, []);

  const fetchUploadedCourseFiles = async () => {
    try {
      const response = await fetch('http://localhost:5000/course/getUploadedCourseFiles');
      if (response.ok) {
        const files = await response.json();
        console.log(files);
        setUploadedCourseFiles(files);
      } else {
        console.error('Error fetching uploaded files:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching uploaded files:', error.message);
    }
  };

  const handleQuestionsFileChange = (event) => {
    setQuestionsFile(event.target.files[0]);
  };

  const handleQuestionSubmit = async (event) => {
    event.preventDefault();

    if (!questionsFile) {
      alert('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('questionsFile', questionsFile);

    try {
      const response = await fetch('http://localhost:5000/feedback/changeQuestions', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        alert('File uploaded successfully.');
      } else {
        alert('Error uploading file.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error uploading file.');
    }
  };



  return (
    <div className='add-data-main-component'>
      <div className="add-data-component">
        <h3>Upload Student Data Files</h3>
        <div className="input-container">
          <label htmlFor="file">Upload CSV File:</label>
          <input type="file" id="file" accept='.csv' onChange={handleFileChange} required />
        </div>
        <button onClick={handleSubmit}>Upload File</button>
        <br /><br />
        <button onClick={() => { downloadFile(STUDENT_FILE_URL) }}>Download Sample Student Data File</button>
        <br /><br /><br />
        {uploadedStudentFiles.length > 0 && (
          <div>
            <h3><u>Uploaded Student Files</u></h3>
            <ul>
              {uploadedStudentFiles.map((file, index) => (
                <li key={index}>{file}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="add-data-component">
        <div className="input-container">
          <h3>Upload Faculty Data Files</h3>
          <label htmlFor="file">Upload CSV File:</label>
          <input type="file" id="file" accept='.csv' onChange={handleFacultyFileChange} required />
        </div>
        <button onClick={handleFacultyFileSubmit}>Upload File</button>
        <br /><br />
        <button onClick={() => { downloadFile(FACULTY_FILE_URL) }}>Download Sample Faculty Data File</button>
        <br /><br /><br />
        {uploadedFacultyFiles.length > 0 && (
          <div>
            <h3><u>Uploaded Faculty Files</u></h3>
            <ul>
              {uploadedFacultyFiles.map((file, index) => (
                <li key={index}>{file}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="add-data-component">
        <div className="input-container">
          <h3>Upload Course Data Files</h3>
          <label htmlFor="file">Upload CSV File:</label>
          <input type="file" id="file" accept='.csv' onChange={handleCourseFileChange} required />
        </div>
        <button onClick={handleCourseSubmit}>Upload File</button>
        <br /><br />
        <button onClick={() => { downloadFile(COURSE_FILE_URL) }}>Download Sample Course Data File</button>
        <br /><br /><br />
        {uploadedCourseFiles.length > 0 && (
          <div>
            <h3><u>Uploaded Course Files</u></h3>
            <ul>
              {uploadedCourseFiles.map((file, index) => (
                <li key={index}>{file}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="add-data-component">
        <div className="input-container">
          <h3>Upload Feedback Questions</h3>
          <label htmlFor="file">Upload CSV File:</label>
          <input type="file" id="file" accept='.csv' onChange={handleQuestionsFileChange} required />
        </div>
        <button onClick={handleQuestionSubmit}>Upload File</button>
        <br /><br />
        <button onClick={() => { downloadFile(QUESTION_FILE_URL) }}>Download Sample Questions Data File</button>
      </div>
    </div>

  );
}

export default AddDataComponent;
