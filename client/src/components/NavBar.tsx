import React from "react";
import "../styles/NavBar.css";

const NavBar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a href="/" className="logo">
          Hotel Wishlist <span className="dot">.</span>
        </a>
      </div>
      <div className="navbar-center">
        <ul className="nav-links">
          <li>
            <a href="/">Explore Hotels</a>
          </li>
          <li>
            <a href="/wishlists">Your Wishlists</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
