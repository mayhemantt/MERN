import React from "react";
import UserNav from "../../components/nav/UserNav";

function History() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <UserNav />
        </div>
        <div className="col">User Page</div>
      </div>
    </div>
  );
}

export default History;
