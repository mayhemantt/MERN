import React from "react";
import { Link } from "react-router-dom";

function AdminNav() {
  return (
    <nav>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link className="nav-link" to="/admin/dashboard">
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/admin/product">
            Password
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/admin/products">
            Wishlist
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/admin/category">
            Category
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/admin/sub">
            Sub Category
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/admin/coupon">
            Coupons
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/user/password">
            Password
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default AdminNav;
