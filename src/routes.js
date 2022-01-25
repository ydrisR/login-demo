import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/home";
import Login from "./containers/login";


export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>

    </Switch>
  );
}
