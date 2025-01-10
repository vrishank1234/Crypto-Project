import React, { useContext } from 'react'
import './Navbar.css'
import CoinContextProvider from '../../context/CoinContext'
import { CoinContext } from '../../context/CoinContext'
import { Link } from 'react-router-dom'

const Navbar = () => {

  const {setCurrency} = useContext(CoinContext)

  const currencyHandler = (event)=>{
    switch(event.target.value){
      case "usd":{
        setCurrency({name:"usd",symbol:"$"});
        break;
      }
      case "inr":{
        setCurrency({name:"inr",symbol:"₹"});
        break;
    }
    default:{
      setCurrency({name:"inr",symbol:"₹"});
      break;
  }
    }

  }
  return (
    <div className='navbar'>
      <Link to = {`/`}>
        <img src='https://assets.coingecko.com/markets/images/520/large/coindcx.png?1706864493' alt='logo' className='logo'/>
        </Link>
        <ul>
        <Link to = {`/`}> <li>Home</li> </Link>
            <Link to = "/TrendingNews"><li>News</li></Link>
            <Link to = "/wallet"><li>Wallet</li> </Link>
            <Link to = "/profile"><li>Profile</li> </Link>
        </ul>
        <div className="nav-right">
            <select onChange={currencyHandler}>
                <option value="USD">USD</option>
                <option value="INR">INR</option>
            </select>
            <Link to="/register"> 
          <button>
            Sign up{" "}
            <img
              src="https://icons.veryicon.com/png/o/miscellaneous/commonly-used-icon-1/arrow-top-right-3.png"
              alt=""
            />
          </button>
        </Link>
        </div>

    </div>
  )
}

export default Navbar
