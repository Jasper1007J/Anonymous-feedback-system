import { useState } from "react";
import Menubar from "./Menubar";
import "./HodDashboard.css";
import { useParams } from "react-router-dom";
import HodProfile from "./HodProfile";
import FacultyWiseFeedbacks from "./FacultyWiseFeedbacks";

const HodDashboard = () => {

  const {username} = useParams();

  const [menuOptionsVisible, setMenuOptionsVisible] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showFeedbacks, setShowFeedbacks] = useState(true);

  const toggleMenuOptions = () => {
    setMenuOptionsVisible(!menuOptionsVisible);
    console.log("Menubar Clicked");
  };

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  const handleProfileClick = () => {
    setShowProfile(!showProfile);
    if (showFeedbacks) {
      setShowFeedbacks(!showFeedbacks);
    }
  };

  const handleShowFeedbacksClick = () => {
    setShowFeedbacks(!showFeedbacks);
    if (showProfile) {
      setShowProfile(!showProfile);
    }
  };

  return (
    <div className="hod-dashboard">
      <header className={`hod-navbar-parent ${sidebarExpanded ? 'sidebar-expanded' : ''}`}>
        <div className="hod-dashboard-text">{username}</div>
      </header>
      <Menubar toggleMenuOptions={toggleMenuOptions} toggleSidebar={toggleSidebar} handleProfileClick={handleProfileClick} handleShowFeedbacksClick={handleShowFeedbacksClick} />
      <div className="faculty-wise-feedbacks">
        {showProfile && <HodProfile hodName={username} />}
        {showFeedbacks && <FacultyWiseFeedbacks username={username} />}
      </div>
    </div>
  );
};

export default HodDashboard;