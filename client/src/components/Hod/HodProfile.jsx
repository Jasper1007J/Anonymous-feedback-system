import React, { useEffect, useState } from "react";
import '../../SharedComponents/Profile.css';
import axios from 'axios';


const HodProfile = ({ hodName }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [profile, setProfile] = useState([]);
  const [error, setError] = useState('');
  const [feedbackProcessing, setFeedbackProcessing] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [accessGiven, setAccessGiven] = useState(false); // State to track accessGiven


  console.log(profile);

  useEffect(() => {
    fetchProfile();
  }, [hodName]);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/hod/${hodName}`);
      const { Department } = response.data;
      setProfile({ Department });
      setAccessGiven(response.data.AccessGiven);
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
      const response = await fetch('http://localhost:5000/hod/changePassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ hodName, oldPassword, newPassword, confirmPassword })
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

  const handleProcessFeedback = async () => {
    try {
      setFeedbackProcessing(true);
      setLoadingMessage("Processing feedback... It may take a while... Do Not Refresh or Close the window...");
      const response = await axios.get(`http://localhost:5000/feedback/processFeedback`);
      alert(response.data.message); // Alert message on success
      setFeedbackProcessing(false);
      setLoadingMessage("");
    } catch (error) {
      console.error('Error processing feedback:', error);
      setFeedbackProcessing(false);
      setLoadingMessage("");
      alert('Error processing feedback. Please try again.'); // Alert message on error
    }
  };

  const toggleAccess = async () => {
    setLoadingMessage("Updating access..."); // Show loading message while updating
    try {
      const response = await axios.post(`http://localhost:5000/hod/toggleAccess`, { hodName });
      setAccessGiven(response.data.accessGiven); // Update accessGiven from server response
      setLoadingMessage("");
    } catch (error) {
      console.error('Error toggling access:', error);
      setLoadingMessage("");
      setError('Error updating access.');
    }
  };



  return (
    <div className="admin-profile-container">
      <form onSubmit={handleChangePassword}>
        <label htmlFor="username">User Name:</label>
        <input type="text" name="username" value={hodName} disabled className="profile-entities" />
        <br />
        <label htmlFor="department">Department: </label>
        <input type="text" name="department" value={profile.Department} disabled className="profile-entities" />
        <br />

        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <label htmlFor="oldPassword">Old Password:</label>
        <input type="password" name="oldPassword" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required className="profile-entities" />
        <br />
        <label htmlFor="newPassword">New Password:</label>
        <input type="password" name="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required className="profile-entities" />
        <br />
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input type="password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="profile-entities" />
        <br />
        <button type="submit">Change Password</button>
      </form>
      <button className="process-feedback-btn" onClick={handleProcessFeedback} disabled={feedbackProcessing}>Process Feedback</button>
      {loadingMessage && <div style={{ color: 'white' }}>{loadingMessage}</div>}
      <br />
      {accessGiven ? (
        <button className="process-feedback-btn" onClick={toggleAccess}>Disable Access to Students</button>
      ) : (
        <button className="process-feedback-btn" onClick={toggleAccess}>Give Access to Students</button>
      )}


    </div>
  );
};

export default HodProfile;
