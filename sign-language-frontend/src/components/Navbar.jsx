import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__brand">Hand 2 Voice</div>
      <nav className="navbar__links">
        <NavLink className="navbar__link" to="/" end>
          Home
        </NavLink>
        <NavLink className="navbar__link" to="/detect">
          Sign Detection
        </NavLink>
        <a className="navbar__link" href="/#how-it-works">
          How it works
        </a>
        <a className="navbar__link" href="/#features">
          Features
        </a>
        <NavLink className="navbar__link" to="/about">
          About Project
        </NavLink>
        <a className="navbar__link" href="/#demo">
          Demo
        </a>
        <a className="navbar__link" href="/#team">
          Team
        </a>
        <a className="navbar__link" href="/#contact">
          Contact
        </a>
      </nav>
    </header>
  );
}
