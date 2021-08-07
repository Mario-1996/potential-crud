import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Cadastrar from "./pages/Cadastrar";
import Listar from "./pages/Listar";


function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/dashboard" />
        </Route>
        <Route path="/dashboard" component={Listar} />
        <Route path="/cadastrar/:id?" component={Cadastrar} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
