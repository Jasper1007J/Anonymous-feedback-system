import { useState } from "react";
import Menubar from "./Menubar";
import AccessFeedbacks from "./AccessFeedbacks";
import "./FacultyDashboard.css";
import { useParams } from "react-router-dom";
import FacultyProfile from "./FacultyProfile";

const FacultyDashboard = () => {

  const { username } = useParams();

  const [menuOptionsVisible, setMenuOptionsVisible] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showFeedback, setShowFeedback] = useState(true);

  const toggleMenuOptions = () => {
    setMenuOptionsVisible(!menuOptionsVisible);
    console.log("Menubar Clicked");
  };

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  const handleProfileClick = () => {
    setShowProfile(!showProfile);
    if (showFeedback) {
      setShowFeedback(!showFeedback);
    }
  };

  const handleShowFeedbackClick = () => {
    setShowFeedback(!showFeedback);
    if (showProfile) {
      setShowProfile(!showProfile);
    }
  };

  return (
    <div className="faculty-dashboard">
      <header className={`faculty-navbar-parent ${sidebarExpanded ? 'sidebar-expanded' : ''}`}>
        <div className="faculty-dashboard-text">{username}</div>
      </header>
      <Menubar toggleMenuOptions={toggleMenuOptions} toggleSidebar={toggleSidebar} handleProfileClick={handleProfileClick} handleShowFeedbackClick={handleShowFeedbackClick} />
      <div className="dashboard-content" >
        {showProfile && <FacultyProfile facultyName = {username} />}
          {showFeedback && <AccessFeedbacks facultyName={username} />}
      </div>
    </div>
  );
};

export default FacultyDashboard;