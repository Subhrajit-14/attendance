import './sidebar.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [profile, setProfile] = useState({
    name: 'Account',
    email: '',
    image: 'https://pics.craiyon.com/2023-11-26/oMNPpACzTtO5OVERUZwh3Q.webp',
  });

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleAddProfile = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) =>
          setProfile((prevProfile) => ({
            ...prevProfile,
            image: e.target.result,
          }));
        reader.readAsDataURL(file);
      }
    };
    fileInput.click();
  };

  const handleEditProfile = () => {
    const newName = prompt('Enter your name:', profile.name);
    const newEmail = prompt('Enter your email:', profile.email);
    if (newName && newEmail) {
      setProfile({ ...profile, name: newName, email: newEmail });
    }
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <button onClick={toggleSidebar} className="toggle-button">
        {isOpen ? '✖' : '☰'}
      </button>
      <div className="account-section">
        <img
          src={profile.image}
          alt="Profile"
          className="profile-image"
          onClick={handleAddProfile}
        />
        <div className="account-info">
          <div className="account-text">
            {profile.name}{' '}
            <span className="edit-icon" onClick={handleEditProfile}>
              ✏️
            </span>
          </div>
          <div className="account-email">{profile.email}</div>
        </div>
      </div>
      <div className="sidebar-links">
        <Link to="/dashboard" className="sidebar-item">
          📊 Dashboard
        </Link>
        <Link to="/attendance" className="sidebar-item">
          🛒 Attendance
        </Link>
        <Link to="/leave" className="sidebar-item">
          🚀 Leave
        </Link>
        <Link to="/leave_approver" className="sidebar-item">
          🏢 Leave Approver
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
