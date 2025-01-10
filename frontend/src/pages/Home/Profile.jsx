import React, { useState, useEffect } from 'react';
import styles from './Profile.module.css'; // You can create your own CSS module for styling
import Logout from '../Logout';


function Profile() {
  const [userData, setUserData] = useState(null); // State to store user data
  const [error, setError] = useState(''); // State to store error messages
  const username = localStorage.getItem('username'); // Get the username from localStorage

  // Fetch user data based on the username from localStorage
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!username) {
          setError('Username is not available in localStorage.');
          return;
        }

        const response = await fetch(`http://localhost:8000/auth/user/${username}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        setUserData(data); // Set the user data if the response is successful
      } catch (err) {
        setError(err.message || 'Failed to fetch user data');
      }
    };

    fetchUserData();
  }, [username]); // Fetch data whenever the username changes (e.g., on page load)



  return (
    <div className={styles.profileContainer}>
      <h1 className={styles.title}>Profile</h1>

      {error ? (
        <p className={styles.errorMessage}>{error}</p> // Display error message if there's any
      ) : userData ? (
        <div className={styles.profileInfo}>
          <div className={styles.profilePicContainer}>
            <img src={userData.profilePic} alt="Profile" className={styles.profilePic} />
          </div>
          <div className={styles.userDetails}>
            <p><strong>Name:</strong> {userData.name}</p>
            <p><strong>Username:</strong> {userData.username}</p>
            <p><strong>Gender:</strong> {userData.gender}</p>
            <p><strong>Profile Picture:</strong> <a href={userData.profilePic} target="_blank" rel="noopener noreferrer">View Profile Picture</a></p>
          </div>
        </div>
      ) : (
        <p className={styles.loadingMessage}>Loading profile...</p> // Display loading message while fetching
      )}

      <Logout />
    </div>
  );
}

export default Profile;
