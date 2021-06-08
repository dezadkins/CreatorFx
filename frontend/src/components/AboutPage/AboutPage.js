import React from "react";
import styled from "styled-components";
import Footer from "../Footer";

const PageContainer = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  padding-top: 10%;
  z-index: 1;
`;

const HeaderDiv = styled.div`
  display: flex;
  justify-content: center;
  height: 200px;
  color: rgb(3, 3, 152);

  font-family: "Cuprum", sans-serif;
`;

const SectionDiv = styled.div`
  display: flex;
  justify-content: center;
  font-family: "Cuprum", sans-serif;
  font-size: 20px;
  color: white;
  width: 100%;
`;

const FooterDiv = styled.div`
  width: 80vw;
  margin-top: 105px;
`;

export default function AboutPage() {
  return (
    <>
      <PageContainer>
        <HeaderDiv>
          <h1>About CreatorFx</h1>
        </HeaderDiv>
        <SectionDiv>
          <p>
            An exclusively sound effects platform, CreatorFx lets people
            discover and enjoy a large selection of sound fx from a diverse
            creative community. Launched in 2020, the platform hopes to become
            renowned for its unique content and features, including the ability
            to share sound effects and connect directly with creators, and users
            alike. This is made possible by an open platform that directly
            connects creators and users across the globe. Film makers and audio
            creators can use CreatorFx to both share and monetise their content
            with a global audience. CreatorFx will continue to update the site.
          </p>
        </SectionDiv>
        <FooterDiv>
          <Footer />
        </FooterDiv>
      </PageContainer>
    </>
  );
}
