import LoginComponent from "./LoginComponent";
import "./AdminLogin.css";

const AdminLogin = () => {
  return (
    <div className="admin-login">
      <img className="loginbg-icon" alt="" src="/adminloginbg.jpg" />
      <LoginComponent />
    </div>
  );
};

export default AdminLogin;
