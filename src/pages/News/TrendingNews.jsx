import React, { useState, useEffect } from 'react';
import "../News/TrendingNews.css";

const TrendingNews = () => {
  const [trendingCoins, setTrendingCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTrendingCoins = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': 'CG-PCSeMkvZzkxZnJZFEE98hcoP', // Replace with your actual API key
      },
    };

    try {
      const response = await fetch('https://api.coingecko.com/api/v3/search/trending', options);

      if (response.status === 429) {
        // Handle rate limit error (429)
        throw new Error('Too many requests. Please try again later.');
      }

      const data = await response.json();
      setTrendingCoins(data.coins);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, []);

  // If loading, display a loading message
  if (loading) {
    return <div>Loading trending news...</div>;
  }

  // If there is an error, display the error message
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="trending-news">
      <h2>Trending Coins</h2>
      <div className="trending-coins">
        {trendingCoins.map((coin) => (
          <div key={coin.item.id} className="coin-card">
            <img src={coin.item.thumb} alt={coin.item.name} className="coin-image" />
            <h3>{coin.item.name}</h3>
            <p>{coin.item.symbol}</p>
            <p>
              {/* Access description from 'content' under 'item' */}
               Market Cap rank {coin.item.market_cap_rank}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingNews;
