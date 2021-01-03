import React from "react";
import UploadFxForm from "./UploadFxForm";
import styled from "styled-components";

export default function UploadFxPage() {
  const PageContainer = styled.div`
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 50%;
    padding-top: 10%;
    // border: 2px solid blue;
    z-index: 1;
  `;

  const PageTitle = styled.h1`
    display: inline;
    font-size: 2.5rem;
    font-family: "Cuprum", sans-serif;

    margin-top: 40px;
    margin-bottom: 15px;
    color: #f5f7f9;
  `;
  return (
    <PageContainer>
      <PageTitle>CREATE FX</PageTitle>
      <UploadFxForm />
    </PageContainer>
  );
}
