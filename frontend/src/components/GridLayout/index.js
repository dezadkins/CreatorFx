import { Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import HomePage from "../HomePage";

import SideNav from "../SideNav";
import "./GridLayout.css";
// import UploadFxPage from "./components/UploadFxPage";

export default function GridLayout() {
  const user = useSelector((state) => state.session.user);

  return (
    <>
      <div className="main__page-container">
        <SideNav userId={user && user.id}> </SideNav>
        <Switch>
          <Route path="/home">
            <HomePage></HomePage>
          </Route>
          {/* <Route path="/fxes/new">
            <UploadFxPage />
          </Route> */}
        </Switch>
      </div>
    </>
  );
}
