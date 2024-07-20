import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import SubmitButton from "../../SharedComponents/SubmitButton/SubmitButton";
import "./StudentLogin.css";

const StudentLogin = ({dashboardRoute}) => {

  // const [rollNumber, setRollNumber] = useState('');
  const navigate = useNavigate();

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    navigate(dashboardRoute);
  }, [navigate]);
  return (
    <form onSubmit={handleSubmit}>
      <div className="student-login">
        <img className="bg-icon" alt="" src="/studentloginbg.jpg" />
        <div className="student-rectangle-parent">
        <div className="student-login-wrapper">
          <h2 className="student-login-text">Login</h2>
        </div>
        <div className="roll-number-parent">
          <div className="roll-number">Roll Number</div>
          <input type="text" name="rollnumber" id="rollNumner" className="student-input-rollno" required />
        </div>
        <SubmitButton />
        </div>
      </div>
    </form>
  );
}

export default StudentLogin;