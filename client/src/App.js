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
import AdminDashboard from "./pages/admin/AdminDashboard";
import Wishlist from "./pages/user/Wishlist";
import Password from "./pages/user/Password";
import CategoryCreate from "./pages/admin/category/CategoryCreate";
import UpdateCategory from "./pages/admin/category/UpdateCategory";
import SubCreate from "./pages/admin/sub/SubCreate";
import ProductCreate from "./pages/admin/product/ProductCreate";
//Methods
import { currentUser } from "./functions/auth";
import AdminRoute from "./components/routes/AdminRoutes";
import UserRoute from "./components/routes/UserRoute";
import UpdateSub from "./pages/admin/sub/SubCatgeoryUpdate";
import AllProducts from "./pages/admin/product/AllProducts";
import ProductUpdate from "./pages/admin/product/ProductUpdate";
import Product from "./pages/Product";
import CategoryHome from "./pages/category/CategoryHome";
import SubHome from "./pages/sub/SubHome";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
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

    return () => unsubscribe();
  }, [dispatch]);

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
        <AdminRoute exact path="/admin/category" component={CategoryCreate} />
        <AdminRoute
          exact
          path="/admin/category/:slug"
          component={UpdateCategory}
        />
        <AdminRoute exact path="/admin/sub" component={SubCreate} />
        <AdminRoute exact path="/admin/sub/:slug" component={UpdateSub} />
        <AdminRoute exact path="/admin/product" component={ProductCreate} />
        <AdminRoute exact path="/admin/products" component={AllProducts} />
        <AdminRoute
          exact
          path="/admin/product/:slug"
          component={ProductUpdate}
        />
        <Route exact path="/product/:slug" component={Product} />
        <Route exact path="/category/:slug" component={CategoryHome} />
        <Route exact path="/sub/:slug" component={SubHome} />
        <Route exact path="/shop" component={Shop} />
        <Route exact path="/cart" component={Cart} />
      </Switch>
    </React.Fragment>
  );
};

export default App;
