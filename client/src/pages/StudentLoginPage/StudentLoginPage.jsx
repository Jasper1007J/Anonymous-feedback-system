import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
// import SubmitButton from "../../SharedComponents/SubmitButton/SubmitButton";
import "../../components/Student/StudentLogin.css";

const StudentLoginPage = () => {
  const [rollNumber, setRollNumber] = useState('');
  const navigate = useNavigate();
  console.log(rollNumber);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/student/validateRollNumber', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ rollNumber })
      });

      if (response.ok) {
        navigate(`/student-dashboard/${rollNumber}`);
      } else {
        console.error('Error validating roll number:', response.statusText);
        alert('Invalid roll number.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error validating roll number.');
    }

  }, [rollNumber, navigate]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="student-login">
        <img className="bg-icon" alt="" src="/studentloginbg.jpg" />
        <div className="student-rectangle-parent">
          <div className="student-login-wrapper">
            <h2 className="student-login-text">LOGIN</h2>
          </div>
          <div className="roll-number-parent">
            <div className="roll-number">Roll Number :</div>
            <input
              type="text"
              name="rollnumber"
              id="rollNumber"
              className="student-input-rollno"
              placeholder="Enter your roll number"
              onChange={(e) => setRollNumber(e.target.value)} 
              value={rollNumber} 
              required
            />
          </div>
          {/* <SubmitButton /> */}
          <button type="submit" className="btn41-43 btn-42" >Submit</button>
        </div>
      </div>
    </form>
  );
};

export default StudentLoginPage;