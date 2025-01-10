import React from 'react';
import Navbar from './components/Navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Coin from './pages/Coin/Coin';
import TrendingNews from './pages/News/TrendingNews';
import Login from './pages/Login';
import Register from './pages/Register'
import Wallet from './pages/Wallet';
import Logout from './pages/Logout';
import Profile from './pages/Home/Profile';

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coin/:coinId" element={<Coin />} />
        {/* <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} /> */}
        <Route path="/" element = {<Login/>}></Route>
          <Route path="/login" element = {<Login/>}></Route>
          <Route path="/register" element = {<Register/>}></Route>
        <Route path="/TrendingNews" element={<TrendingNews />} />
        <Route path = "/wallet" element={<Wallet/>}></Route>
        <Route path ="/profile" element={<Profile/>}></Route>
        <Route path ="/logout" element={<Logout/>}></Route>

      </Routes>
    </div>
  );
};

export default App;
