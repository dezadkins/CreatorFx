import React from "react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import styled from "styled-components";

import SideNav from "../SideNav";
import HomePage from "../HomePage";
import EditFxPage from "../EditFxPage/EditFxPage";
import Footer from "../Footer";
import UploadFxPage from "../UploadFxPage/UploadFxPage";
import ProfilePage from "../ProfilePage/ProfilePage";

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
  // align-content: start;
`;

const RootContainer = styled.div`
  background: linear-gradient(
    0deg,
    rgba(176, 158, 158, 1) 0%,
    rgba(62, 62, 57, 1) 100%
  );
  height: 100%;
  margin: -8px;
  z-index: -1px;
`;

// const FooterGrid = styled.div`
//   grid-area: footer;
//   padding: 1rem;
//   display: flex;
//   align-items: center;
//   width: 95%;
//   margin-bottom: 65px;
//   height: 2vh;
// `;

export default function GridLayout() {
  const user = useSelector((state) => state.session.user);

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
            <Route path="/fxes/:fxId/edit">
              <EditFxPage />
            </Route>
            <Route path="/users/:userId">
              <ProfilePage></ProfilePage>
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
