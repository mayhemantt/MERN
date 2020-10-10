// React imports
import React from "react";
import { Switch, Route } from "react-router-dom";

// Modules import
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Component Import
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Header from "./components/nav/Header";
import RegisterComplete from "./pages/auth/RegisterComplete";

//Main

const App = () => {
  return (
    <React.Fragment>
      <Header />
      <ToastContainer />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register/complete' component={RegisterComplete} />
      </Switch>
    </React.Fragment>
  );
};

export default App;
