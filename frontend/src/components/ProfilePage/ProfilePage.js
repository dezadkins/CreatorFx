import React from "react";
import { useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import styled from "styled-components";
import MyProfile from "./MyProfile";
import OtherProfile from "./OtherProfile";

const PageContainer = styled.div`
  min-height: 100%;
  width: 100%;
  height: 100%;
  position: relative;
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: auto;
  //   grid-template-areas:
  //     "now-playing-bar now-playing-bar"
  //     "main-view main-view main-view";
  //   background-color: #323f4b;
`;

export default function ProfilePage() {
  const user = useSelector((state) => {
    return state.session.user;
  });
  const { userId } = useParams();

  if (!user) {
    return <Redirect to="/" />;
  } else if (user.id === parseInt(userId, 10)) {
    return (
      <PageContainer>
        <MyProfile userId={userId}></MyProfile>
      </PageContainer>
    );
  } else {
    return (
      <PageContainer>
        <OtherProfile userId={userId}></OtherProfile>
      </PageContainer>
    );
  }
}
