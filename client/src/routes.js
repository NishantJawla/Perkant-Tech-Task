import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import HomePage from "./pages/homepage/homepage.component";
import Scoreboard from "./pages/scoreboard/scoreboard.component";
const Routes = () => {
  return (
      <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/scoreboard" exact component={Scoreboard} />
      </Switch>
    </BrowserRouter>
    </Provider>
  );
};

export default Routes;