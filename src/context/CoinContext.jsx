// import { createContext, useEffect, useState } from "react"

// export const CoinContext = createContext();

// const CoinContextProvider = (props)=>{

    
//     //data from api is in array form , storing it in empty array
//     const [allCoin , setAllCoin] = useState([]);
//     const [currency , setCurrency] = useState({
//         //object
//         //property
//         name : "usd",
//         symbol : "$"
//     })

//     const fetchAllCoin = async ()=> {
//         //fetching data from api
//         const options = {
//             method: 'GET',
//             headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-PCSeMkvZzkxZnJZFEE98hcoP'}
//           };
          
//           fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options)
//             .then(res => res.json())
//             .then(res => setAllCoin(res))
//             .catch(err => console.error(err));
//     }
//     useEffect(()=>{
//         fetchAllCoin();
//     },[currency])
//     //object
//     const contextValue = {
//         allCoin,currency,setCurrency
//     }
//     return(
//         <CoinContext.Provider value={contextValue}>
//             {props.children}
//         </CoinContext.Provider>
//     )
// }

// export default CoinContextProvider;
import { createContext, useEffect, useState } from "react";

export const CoinContext = createContext();

const CoinContextProvider = (props) => {
  // State for all coins data fetched from API
  const [allCoin, setAllCoin] = useState([]);

  // State for currency details
  const [currency, setCurrency] = useState({
    name: "usd",
    symbol: "$",
  });

  // State for user details (e.g., username)
  const [username, setUsername] = useState(() => {
    // Retrieve username from localStorage or set a default
    const storedUsername = localStorage.getItem("crypto_username");
    return storedUsername || "guest"; // Default username is "guest"
  });

  const fetchAllCoin = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-PCSeMkvZzkxZnJZFEE98hcoP",
      },
    };

    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`,
      options
    )
      .then((res) => res.json())
      .then((res) => setAllCoin(res))
      .catch((err) => console.error(err));
  };

  // Save username to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("crypto_username", username);
  }, [username]);

  useEffect(() => {
    fetchAllCoin();
  }, [currency]);

  // Context object to provide throughout the app
  const contextValue = {
    allCoin,
    currency,
    setCurrency,
    username,
    setUsername,
  };

  return (
    <CoinContext.Provider value={contextValue}>
      {props.children}
    </CoinContext.Provider>
  );
};

export default CoinContextProvider;
