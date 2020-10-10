import React from "react";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { Switch, Route } from "react-router-dom";
import Header from './components/nav/Header'
const App = () => {
  return (
    <React.Fragment>
      <Header />
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/register' component={Register} />
      <Route exact path='/login' component={Login} />
    </Switch>
    </React.Fragment>
  );
};

export default App;
