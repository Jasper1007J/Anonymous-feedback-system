import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../Admin/Menubar.css";

const Menubar = ({toggleMenuOptions}) => {

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
          <div className="icon-div">
          <img
            className="menu-icon"
            loading="lazy"
            alt=""
            src="/menu.png"
            onClick={handleMenuClick}
          />
          {expanded && <span className="profile-text">Menu</span>}
          </div>
          <div className="icon-div">
            <img className="user-icon" loading="lazy" alt="" src="/form.png" />
            {expanded && <span className="profile-text">Feedback Form</span>}
          </div>
          {/* <div className="icon-div">
          <img
            className="add-data-icon"
            loading="lazy"
            alt=""
            src="/help.png"
          />
          {expanded && <span className="add-data-text">Help</span>}
          </div> */}
          
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