import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Menubar.css";

const Menubar = ({toggleMenuOptions, handleAddDataClick, handleProfileClick}) => {

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
          <div className="icon-div" onClick={handleAddDataClick}>
          <img
            className="add-data-icon"
            loading="lazy"
            alt=""
            src="/add-database.png"
          />
          {expanded && <span className="add-data-text">Add Data</span>}
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