/** @format */

// React imports
import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";

// Modules import
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { auth } from "./firebase";
import { useDispatch } from "react-redux";
// Component Import
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Header from "./components/nav/Header";
import RegisterComplete from "./pages/auth/RegisterComplete";
import ForgotPassword from "./pages/auth/ForgotPassword";
import History from "./pages/user/History";
import UserRoute from "./components/routes/UserRoute";

//Methods
import { currentUser } from "./functions/auth";
import Wishlist from "./pages/user/Wishlist";
import Password from "./pages/user/Password";
import AdminRoute from "./components/routes/AdminRoutes";
import AdminDashboard from "./pages/admin/AdminDashboard";

// render app
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        await currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                role: res.data.role,
                _id: res.data._id,
                email: res.email,
                token: idTokenResult.token,
              },
            });
            // history.push("/");
          })
          .catch((err) => console.log(err));
      }
    });
  }, []);

  return (
    <React.Fragment>
      <Header />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register/complete" component={RegisterComplete} />
        <Route exact path="/forgot/password" component={ForgotPassword} />
        <UserRoute exact path="/user/history" component={History} />
        <UserRoute exact path="/user/wishlist" component={Wishlist} />
        <UserRoute exact path="/user/password" component={Password} />
        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
      </Switch>
    </React.Fragment>
  );
};

export default App;
