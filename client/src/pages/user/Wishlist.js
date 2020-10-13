import React from "react";
import UserNav from "../../components/nav/UserNav";

function Wishlist() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <UserNav />
        </div>
        <div className="col">Wishlist Page</div>
      </div>
    </div>
  );
}

export default Wishlist;
