import React, { useEffect, useState } from "react";
import { Route, Link, Router } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "../LoadingToRedirect";
import { currentAdmin } from "../../functions/auth";

function AdminRoute({ children, ...rest }) {
  const { user } = useSelector((state) => ({ ...state }));
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then((res) => {
          console.log("Current Admin Res", res);
          setOk(true);
        })
        .catch((err) => {
          console.log("Admin Route err", err);
          setOk(false);
        });
    }
  }, [user]);

  return ok ? (
    <Route {...rest} render={() => children} />
  ) : (
    <LoadingToRedirect />
  );
}

export default AdminRoute;
