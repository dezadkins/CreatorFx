import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
// import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation/";
// import LoginForm from "./components/LoginFormModal/LoginForm";
import LandingPage from "./components/LandingPage";
// import HomePage from "./components/HomePage";
import GridLayout from "./components/GridLayout";
// import styled from "styled-components";
// import UploadFxPage from "./components/UploadFxPage";
// import SideNav from "./components/SideNav";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded}></Navigation>
      <Route exact path="/">
        <LandingPage />
      </Route>

      <Switch>
        <Route path="/home">
          <GridLayout />
        </Route>
        <Route path="/fxes/new">
          <GridLayout />
        </Route>
        <Route path="/users/:userId">
          <GridLayout />
        </Route>
      </Switch>
    </>
  );
}

export default App;
