import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import HomePage from "./pages/homepage/homepage.component";
import Navbar from "./components/navbar/navbar.component";
const Routes = () => {
  return (
      <Provider store={store}>
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/" exact component={HomePage} />
      </Switch>
    </BrowserRouter>
    </Provider>
  );
};

export default Routes;