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
  color: rgb(3, 3, 152);
  font-family: "Cuprum", sans-serif;
`;

const SectionDiv = styled.div`
  display: flex;
  justify-content: center;
  font-family: "Cuprum", sans-serif;
  font-size: 20px;
  width: 100%;
  border: 1px solid white;
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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
            aspernatur eaque doloribus? Tempora ratione facilis eum accusamus
            magnam deleniti, illum, quas voluptate dolore aliquid inventore
            sapiente? Facere, voluptatem maiores totam corporis ut cum est optio
            modi eaque, fuga a nihil autem. Veniam placeat mollitia quae libero
            tempore? Harum quaerat quidem itaque labore perferendis voluptate
            ipsam vero ducimus, quibusdam atque, nisi necessitatibus, eligendi
            voluptatibus. Maxime sed unde quae officiis aut nemo eum natus
            consequuntur pariatur a. Hic accusamus doloremque aliquam sed.
          </p>
        </SectionDiv>
        <FooterDiv>
          <Footer />
        </FooterDiv>
      </PageContainer>
    </>
  );
}
