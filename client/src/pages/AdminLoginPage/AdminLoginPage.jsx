import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import SubmitButton from '../../SharedComponents/SubmitButton/SubmitButton'
import "../../SharedComponents/LoginComponent/LoginComponent.css";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        navigate("/admin-dashboard");
      } else {
        setError(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setError(true);
    }
  }, [navigate, username, password]);

  return (
    <div className="admin-login">
      <img className="loginbg-icon" alt="" src="/adminloginbg.jpg" />
      <form className="login-container-parent" onSubmit={handleSubmit}>
        <div className="login-container" />
        <div className="login-wrapper">
          <h1 className="login-text">Login</h1>
        </div>
        <div className="input-parent">
          <div className="text"><label htmlFor="username">User Name</label></div>
          <div className="user-input">
            <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} id="username" className="userinput" required />
          </div>
        </div>
        <div className="input-parent">
          <div className="text"><label htmlFor="userpassword">Password</label></div>
          <div className="user-input">
            <input type="password" name="userpassword" value={password} onChange={(e) => setPassword(e.target.value)} id="userpassword" className="userinput" required />
          </div>
        </div>
        <SubmitButton />
        {error && <div className="error-message">Invalid username or password</div>}
      </form>
    </div>
  );
};

export default AdminLogin;
