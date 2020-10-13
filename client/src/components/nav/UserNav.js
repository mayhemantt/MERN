import React from "react";
import { Link } from "react-router-dom";

function UserNav() {
  return (
    <nav>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link className="nav-link" to="/user/history">
            history
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/user/password">
            Password
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/user/wishlist">
            Wishlist
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default UserNav;
