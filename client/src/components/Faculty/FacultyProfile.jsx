import React, { useEffect, useState } from "react";
import '../../SharedComponents/Profile.css';
import axios from 'axios';

const FacultyProfile = ({ facultyName }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [profile, setProfile] = useState([]);
  const [error, setError] = useState('');

  console.log(profile);

  useEffect(() => {
    fetchProfile();
  }, [facultyName]);

  const fetchProfile = async () => {

    try {
      const response = await axios.get(`http://localhost:5000/faculty/${facultyName}`);
      const { Department, CoursesAssigned } = response.data;
      setProfile({ Department, CoursesAssigned });
      setError('');
    } catch {
      setError('Faculty not found');
      setProfile(null);
    }

  };

  const handleChangePassword = async (event) => {
    event.preventDefault();

    // Validate new password and confirmation
    if (newPassword !== confirmPassword) {
      setErrorMessage("New password and confirmation do not match.");
      return;
    }

    // Make a request to backend to verify old password and update new password
    try {
      const response = await fetch('http://localhost:5000/faculty/changePassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ facultyName, oldPassword, newPassword, confirmPassword })
      });

      if (response.ok) {
        alert('Password changed successfully.');
        // Clear input fields after successful password change
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setErrorMessage("");
      } else {
        const data = await response.json();
        setErrorMessage(data.message || 'Error changing password.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Error changing password.');
    }
  };

  return (
    <div className="admin-profile-container">
      <form onSubmit={handleChangePassword}>
        <label htmlFor="username">User Name:</label>
        <input type="text" name="username" value={facultyName} disabled />
        <br />
        <label htmlFor="department">Department: </label>
        <input type="text" name="department" value={profile.Department} disabled />
        <br />
        <label htmlFor="courses">Courses Assigned:</label>
        {profile.CoursesAssigned && profile.CoursesAssigned.map((course, index) => (
          <div key={index}>
            <input type="text" name="courses" value={course} disabled />
          </div>
        ))}
        <br />
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <label htmlFor="oldPassword">Old Password:</label>
        <input type="password" name="oldPassword" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required />
        <br />
        <label htmlFor="newPassword">New Password:</label>
        <input type="password" name="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
        <br />
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input type="password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        <br />
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
};

export default FacultyProfile;
