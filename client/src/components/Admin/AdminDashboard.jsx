import { useState } from "react";
import Menubar from "./Menubar";
import "./AdminDashboard.css";
import AddDataComponent from "./AddDataComponent";
import AdminProfile from "./AdminProfile";

const AdminDashboard = () => {

  const [menuOptionsVisible, setMenuOptionsVisible] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showAddData, setShowAddData] = useState(true);

  const toggleMenuOptions = () => {
    setMenuOptionsVisible(!menuOptionsVisible);
    console.log("Menubar Clicked");
  };

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  const handleProfileClick = () => {
    setShowProfile(!showProfile);
    if (showAddData) {
      setShowAddData(!showAddData);
    }
  };

  const handleAddDataClick = () => {
    setShowAddData(!showAddData);
    if (showProfile) {
      setShowProfile(!showProfile);
    }
  };

  return (
    <div className="admin-dashboard">
      <header className={`admin-navbar-parent ${sidebarExpanded ? 'sidebar-expanded' : ''}`}>
        <div className="admin-dashboard-text">Admin</div>
      </header>
      <Menubar toggleMenuOptions={toggleMenuOptions} toggleSidebar={toggleSidebar} handleProfileClick={handleProfileClick} handleAddDataClick={handleAddDataClick} />

      <div className="dashboard-content">
        {showProfile && <AdminProfile />}
        {showAddData && <AddDataComponent />}
      </div>
    </div>
  );
};

export default AdminDashboard;