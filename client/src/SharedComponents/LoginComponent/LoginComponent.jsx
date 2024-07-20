import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import SubmitButton from "../SubmitButton/SubmitButton";
import "./LoginComponent.css";

const Login = ({dashboardRoute}) => {

  const navigate = useNavigate();

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    navigate(dashboardRoute);
  }, [navigate]);

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
          <input type="text" name="username" id="username" className="userinput" required />
        </div>
      </div>
      <div className="input-parent">
        <div className="text">Password</div>
        <div className="user-input">
        <input type="password" name="userpassword" id="userpassword" className="userinput" required />
        </div>
      </div>
      <SubmitButton />
    </form>
    </div>
  );
};

export default Login;
