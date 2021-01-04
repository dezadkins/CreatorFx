import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation/";
import LandingPage from "./components/LandingPage";
import GridLayout from "./components/GridLayout";
import NewCollection from "./components/NewCollection/NewCollection";

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
        <Route path="/fxes/:fxId/edit">
          <GridLayout />
        </Route>
        <Route path="/users/:userId">
          <GridLayout />
        </Route>
        <Route path="/about">
          <GridLayout />
        </Route>
        <Route path="/newcollection">
          <GridLayout />
        </Route>
      </Switch>
    </>
  );
}

export default App;
