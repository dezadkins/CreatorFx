import React from "react";
import { useSelector } from "react-redux";
// import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";

import SideNav from "../SideNav";
import HomePage from "../HomePage";
import EditFxPage from "../EditFxPage/EditFxPage";
// import Footer from "../Footer";
import UploadFxPage from "../UploadFxPage/UploadFxPage";
import ProfilePage from "../ProfilePage/ProfilePage";

// const PageContainer = styled.div`
//   position: relative;
//   display: grid;
//   grid-template-rows: 1fr auto 1fr;
//   // overflow-x: hidden;
//   grid-template-columns: auto 1fr;
//   grid-template-areas:
//     "side-nav  now-playing-bar"
//     "side-nav  main-view"
//     "side-nav  footer";
//   align-content: start;
//   z-index: 1;
// `;
const PageContainer = styled.div`
  min-height: 100%;
  width: 100%;
  height: 100%;
  position: relative;
  display: grid;
  grid-template-rows: auto 1fr auto;
  overflow-x: hidden;
  grid-template-columns: auto 1fr;
  grid-template-areas:
    "side-nav  now-playing-bar"
    "side-nav  main-view"
    "side-nav  footer";
  align-content: start;
  // background-color: #323f4b;
  align-content: start;
`;

const RootContainer = styled.div`
  background: linear-gradient(
    0deg,
    rgba(176, 158, 158, 1) 0%,
    rgba(62, 62, 57, 1) 100%
  );
  height: 100%;
  margin: -8px;
`;

// const FooterGrid = styled.div`
//   display: flex;
//   align-items: flex-end;
//   position: fixed;
//   width: 99%;
//   height: 100%;
//   margin-top: 50px;
//   background-color: transparent;
//   // border: 1px solid black;
//   // z-index: 2;
// `;

export default function GridLayout() {
  // const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  // const [searching, setSearching] = useState(false);
  // const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.session.user);
  // const term = useSelector((state) => {
  //     return state.search.term;
  // });

  // const history = useHistory();

  // useEffect(() => {
  //     if (term === "") {
  //         setSearching(false);
  //     } else {
  //         setSearching(true);
  //     }

  //     return function cleanup() {
  //         setSearching(false);
  //     };
  // }, [term]);

  // const handleClick = (e, fx) => {
  //     e.preventDefault();
  //     setCurrentlyPlaying(fx);
  // };

  return (
    <>
      <RootContainer>
        <PageContainer>
          <SideNav userId={user && user.id}></SideNav>
          <Switch>
            <Route path="/home">
              <HomePage></HomePage>
            </Route>
            <Route path="/fxes/new">
              <UploadFxPage />
            </Route>
            <Route path="/users/:userId">
              <ProfilePage></ProfilePage>
            </Route>
            <Route path="/fxes/:fxId/edit">
              <EditFxPage />
            </Route>
          </Switch>
          {/* <FooterGrid>
            <Footer />
          </FooterGrid> */}
        </PageContainer>
      </RootContainer>
    </>
  );
}
