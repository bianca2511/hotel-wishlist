import React from "react";
import "../styles/NavBar.css";
import { Link } from "react-router-dom";

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
            <Link to="/wishlists">Your Wishlists</Link>{" "}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
