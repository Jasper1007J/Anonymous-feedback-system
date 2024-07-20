import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../Admin/Menubar.css";

const Menubar = ({toggleMenuOptions, handleProfileClick, handleShowFeedbacksClick}) => {

  const [expanded, setExpanded] = useState(false);

  const handleMenuClick = () => {
    setExpanded(!expanded);
    toggleMenuOptions();
  };

    const navigate = useNavigate();

    const handleLogout = useCallback(() => {
      navigate("/");
    }, [navigate]);

  return (
    <div className={`menubar-parent ${expanded ? "expanded": ""}`}>
      <div className="menubar-frame-wrapper">
        <div className="user-parent">
          <img
            className="menu-icon"
            loading="lazy"
            alt=""
            src="/menu.png"
            onClick={handleMenuClick}
          />
          <div className="icon-div" onClick={handleProfileClick}>
            <img className="user-icon" loading="lazy" alt="" src="/user.png" />
            {expanded && <span className="profile-text">Profile</span>}
          </div>
          <div className="icon-div" onClick={handleShowFeedbacksClick}>
          <img
            className="add-data-icon"
            loading="lazy"
            alt=""
            src="/faculty-wise.png"
          />
          {expanded && <span className="add-data-text">Faculty-wise Feedbacks</span>}
          </div>
          
        </div>
      </div>
      <div className="icon-div" onClick={handleLogout}>
      <img
        className="logout-icon"
        alt=""
        src="/logout.svg"
      />
      {expanded && <span className="logout-text">Logout</span>}
      </div>
    </div>
  );
};

export default Menubar;