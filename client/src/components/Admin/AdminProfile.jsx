import React, { useState } from "react";
import '../../SharedComponents/Profile.css';
import axios from 'axios';

const AdminProfile = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChangePassword = async (event) => {
        event.preventDefault();

        // Validate new password and confirmation
        if (newPassword !== confirmPassword) {
            setErrorMessage("New password and confirmation do not match.");
            return;
        }

        // Make a request to backend to verify old password and update new password
        try {
            const response = await fetch('http://localhost:5000/admin/changePassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ oldPassword, newPassword, confirmPassword })
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

    const handleDeleteData = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete all data?");
        if (confirmDelete) {
          try {
            const response = await axios.post(`http://localhost:5000/admin/deleteAllData`);
            alert(response.data.message);
          } catch (error) {
            console.error('Error deleting data:', error);
            alert('Error deleting data. Please try again.');
          }
        }
      };

    return (
        <div className="admin-profile-container">
            <form onSubmit={handleChangePassword}>
            <label htmlFor="username">User Name:</label>
                <input type="text" name="username" value="admin" disabled className="profile-entities"/>
                <br />
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <label htmlFor="oldPassword">Old Password:</label>
                <input type="password" name="oldPassword" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required className="profile-entities"/>
                <br />
                <label htmlFor="newPassword">New Password:</label>
                <input type="password" name="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required className="profile-entities" />
                <br />
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input type="password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="profile-entities" />
                <br />
                <button type="submit">Change Password</button>
                <button className="delete-button" onClick={handleDeleteData}>Delete All Data</button>
            </form>
        </div>
    );
};

export default AdminProfile;
