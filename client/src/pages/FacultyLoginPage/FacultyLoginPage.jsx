import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import SubmitButton from '../../SharedComponents/SubmitButton/SubmitButton'
import "../../SharedComponents/LoginComponent/LoginComponent.css";
import axios from 'axios';

const FacultyLoginPage = () => {

  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/faculty/authenticateFaculty', { username, password });
      navigate(`/faculty-dashboard/${username}`);
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="admin-login">
      <img className="loginbg-icon" alt="" src="/adminloginbg.jpg" />
      <form className="login-container-parent" onSubmit={handleSubmit}>
        <div className="login-container" />
        <div className="login-wrapper">
          <h1 className="login-text">Login</h1>
        </div>
        <div className="input-parent">
          <div className="text">User Name</div>
          <div className="user-input">
            <input type="text" name="username" id="username" className="userinput" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
        </div>
        <div className="input-parent">
          <div className="text">Password</div>
          <div className="user-input">
            <input type="password" name="userpassword" id="userpassword" className="userinput" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
        </div>
        <SubmitButton />
        {error && <div className="error-message">Invalid username or password</div>}
      </form>
    </div>
  );
};

export default FacultyLoginPage;
