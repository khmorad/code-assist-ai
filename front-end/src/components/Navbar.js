import React from 'react';
import '../componentStyling/Navbar.css';
const Navbar = () => {
  return (
    <nav className="navbar">
      <a href="#home" className="navbar-brand">CodeAssist.AI</a>
      <ul className="nav-menu">
        <li className="nav-item">
          <a href="#home">🏠 Home</a>
        </li>
        <li className="nav-item">
          <a href="#about">ℹ️ About</a>
        </li>
        <li className="nav-item">
          <a href="#services">⚙️ Features</a>
        </li>
        <li className="nav-item">
          <a href="#contact">📧 Contact</a>
        </li>
      </ul>
      <button className="mobile-menu-toggle" aria-label="Toggle menu">
        ☰
      </button>
    </nav>
  );
};

export default Navbar;
