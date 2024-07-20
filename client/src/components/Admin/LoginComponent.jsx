import './AdminLogin.css';
import "./LoginComponent.css";
const Login = () => {
  return (
    <form className="login-container-parent">
      <div className="login-container" />
      <div className="login-wrapper">
        <h1 className="login">Login</h1>
      </div>
      <div className="input-parent">
        <div className="text">User Name</div>
        <div className="user-input">
          <input type="text" name="username" id="username" className="userinput" />
        </div>
      </div>
      <div className="input-parent">
        <div className="text">Password</div>
        <div className="user-input">
        <input type="password" name="userpassword" id="userpassword" className="userinput" />
        </div>
      </div>
      <div className="submit-wrapper">
        <button className="submit">
          <div className="submit1">Submit</div>
        </button>
      </div>
    </form>
  );
};

export default Login;