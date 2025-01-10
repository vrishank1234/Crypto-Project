import React, { useContext, useEffect, useState } from "react";
import "./Coin.css";
import { useParams } from "react-router-dom";
import { CoinContext } from "../../context/CoinContext";
import { Chart } from "react-google-charts";

const Coin = () => {
    const { coinId } = useParams();
    const { currency, username, userId } = useContext(CoinContext); // Assume userId comes from CoinContext
    const [coinData, setCoinData] = useState();
    const [historicalData, setHistoricalData] = useState([]);
    const [transactionHistory, setTransactionHistory] = useState([]);
    const [balance, setBalance] = useState(0);

    // Fetch coin data
    const fetchCoinData = async () => {
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                "x-cg-demo-api-key": "CG-PCSeMkvZzkxZnJZFEE98hcoP",
            },
        };

        fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
            .then((res) => res.json())
            .then((res) => setCoinData(res))
            .catch((err) => console.error(err));
    };

    // Fetch historical data
    const fetchHistoricalData = async () => {
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                "x-cg-demo-api-key": "CG-PCSeMkvZzkxZnJZFEE98hcoP",
            },
        };

        fetch(
            `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`,
            options
        )
            .then((res) => res.json())
            .then((res) => {
                const chartData = [["Day", "Low", "Open", "Close", "High"]];
                res.prices.forEach((price, index) => {
                    if (res.prices[index] && res.prices[index + 1]) {
                        chartData.push([
                            `Day ${index + 1}`,
                            res.prices[index][1] * 0.9, // Low (simulated)
                            res.prices[index][1], // Open
                            res.prices[index + 1][1], // Close
                            res.prices[index][1] * 1.1, // High (simulated)
                        ]);
                    }
                });
                setHistoricalData(chartData);
            })
            .catch((err) => console.error(err));
    };

    // Handle Buy/Sell actions
    const check1 = async (action) => {
        try {
            const currentPrice =
                coinData.market_data.current_price[currency.name];
                const username1 = localStorage.getItem("username")
                console.log("This:",username1);
                

            // Call the API to add a transaction
            const token = localStorage.getItem("token");
            console.log(token);
            const response = await fetch(
                "http://localhost:8000/transactions/add",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        username: username1,
                        type: action,
                        numberOfCoins: 1,
                        coinCurrency: coinData.symbol.toUpperCase(),
                        date: new Date().toLocaleString(),
                    }),
                }
            );

            if (response.ok) {
                alert(
                    `${action === "Buy" ? "Bought" : "Sold"} 1 ${
                        coinData.symbol
                    } for ${currency.symbol}${currentPrice}`
                );
            } else {
                const errorData = await response.json();
                console.error("Transaction failed:", errorData);
            }
        } catch (error) {
            console.error("Error performing transaction:", error);
        }
    };

    // Fetch transactions by username
    const myTransactions = async () => {
        const username1=localStorage.getItem("username")
        console.log(username1)
        try {
            const response = await fetch(
                `http://localhost:8000/transactions/${username1}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.ok) {
                const data = await response.json();
                setTransactionHistory(data);
            } else {
                console.error("Failed to fetch transactions");
            }
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    };

    useEffect(() => {
        fetchCoinData();
        fetchHistoricalData();
        myTransactions(); // Call the function to fetch user's transactions
    }, [currency, username]);

    if (coinData && historicalData.length) {
        return (
            <div className="coin">
                <div className="coin-name">
                    <img src={coinData.image.large} alt={coinData.name} />
                    <p>
                        <b>
                            {coinData.name} ({coinData.symbol.toUpperCase()})
                        </b>
                    </p>
                </div>
                <div className="coin-chart">
                    <Chart
                        chartType="CandlestickChart"
                        width="100%"
                        height="250px"
                        data={historicalData}
                        options={{
                            legend: "none",
                            candlestick: {
                                fallingColor: {
                                    strokeWidth: 0,
                                    fill: "#a52714",
                                },
                                risingColor: {
                                    strokeWidth: 0,
                                    fill: "#0f9d58",
                                },
                            },
                        }}
                    />
                </div>
                <div className="coin-info">
                    <ul>
                        <li>Crypto Market Rank</li>
                        <li>{coinData.market_cap_rank}</li>
                    </ul>
                    <ul>
                        <li>Current Price</li>
                        <li>
                            {currency.symbol}
                            {coinData.market_data.current_price[
                                currency.name
                            ].toLocaleString()}
                        </li>
                    </ul>
                    <ul>
                        <li>24 Hour High</li>
                        <li>
                            {currency.symbol}
                            {coinData.market_data.high_24h[
                                currency.name
                            ].toLocaleString()}
                        </li>
                    </ul>
                    <ul>
                        <li>24 Hour Low</li>
                        <li>
                            {currency.symbol}
                            {coinData.market_data.low_24h[
                                currency.name
                            ].toLocaleString()}
                        </li>
                    </ul>
                </div>
                <div className="buy-btn-container">
                    <button onClick={() => check1("Buy")}>
                        Buy {coinData.symbol.toUpperCase()}
                    </button>
                    <button onClick={() => check1("Sell")}>
                        Sell {coinData.symbol.toUpperCase()}
                    </button>
                </div>
                <div className="transaction-history">
  <h3>Transaction History</h3>
  <ul>
    {transactionHistory.length > 0 ? (
      transactionHistory.map((transaction, index) => (
        <li key={index}>
          {transaction.type} {transaction.numberOfCoins} {transaction.coinCurrency} on {transaction.date}
        </li>
      ))
    ) : (
      <p>No transactions found</p>
    )}
  </ul>
</div>

            </div>
        );
    } else {
        return  <div className="spinner">
        <div className="spin"></div>
      </div>
    }
};

export default Coin;
