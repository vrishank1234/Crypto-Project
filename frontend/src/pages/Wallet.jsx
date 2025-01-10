import React, { useState, useEffect } from 'react';
import styles from './Wallet.module.css'; // Import the module CSS

function Wallet() {
  const [walletData, setWalletData] = useState([]);
  const [error, setError] = useState('');
  const username = localStorage.getItem('username'); // Get username from localStorage
//   cons

  useEffect(() => {
    const fetchWalletData = async () => {
        try {
            const username = localStorage.getItem('username'); // Ensure username is available
            if (!username) {
                throw new Error('Username not found in localStorage');
            }
    
            // Make the fetch request to the backend
            const response = await fetch(`http://localhost:8000/wallet/${username}`, {
                method: 'GET', // Explicitly setting the method as GET
                headers: {
                    'Content-Type': 'application/json', // Ensures the request is treated as JSON
                },
            });
    
            // Check if the response is okay (status 200)
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
    
            // Resolve the response to JSON and log the result
            const data = await response.json();
            console.log("This", data); // Logs the wallet data
    
            // Update the state with the wallet data
            setWalletData(data);
        } catch (err) {
            // Handle errors and set the error state
            console.error("Error fetching wallet data:", err);
            setError(err.message || 'Failed to fetch wallet data');
        }
    };
    
    if (username) {
      fetchWalletData();
    } else {
      setError('Username not found in localStorage');
    }
  }, []);

  return (
    <div className={styles.walletContainer}>
      <h1 className={styles.title}>Wallet Balance</h1>
      {error ? (
        <p className={styles.errorMessage}>{error}</p>

      ) : (
        <div className={styles.walletList}>
          {walletData.length > 0 ? (
            walletData.map((wallet, index) => (
              <div key={index} className={styles.walletItem}>
                <p><strong>Currency:</strong> {wallet.coinCurrency}</p>
                <p><strong>Balance:</strong> {wallet.numberOfCoins}</p>
              </div>
            ))
          ) : (
            <p className={styles.noData}>No wallet data available</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Wallet;
