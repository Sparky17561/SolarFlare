// Navbar.jsx
import React from 'react';


const Navbar = ({ onMenuClick }) => {
  return (
    <nav className="navbar">
      <div className="navbar__left">
        <button className="navbar__menu-btn" onClick={onMenuClick}>
          ☰
        </button>
        <h1 className="navbar__title">Augura Space</h1>
      </div>
      
      <div className="navbar__links">
        <button className="navbar__link">Data</button>
        <button className="navbar__link">Contact</button>
      </div>
    </nav>
  );
};

export default Navbar;
