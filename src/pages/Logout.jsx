import React from 'react';
import './Logout.css'; // Ensure this file exists and has the required styles

function Logout() {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/register';
  };

  return (
    <button className="logoutButton" onClick={handleLogout}>
      Logout
    </button>
  );
}

export default Logout;
