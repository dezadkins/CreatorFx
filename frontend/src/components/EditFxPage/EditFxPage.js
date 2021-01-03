import React from "react";
import EditFxForm from "./EditFxForm";
import styled from "styled-components";

export default function EditFxPage({ fx }) {
  const PageContainer = styled.div`
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 500px;
    z-index: 1;
  `;

  const PageTitle = styled.h1`
    display: inline;
    font-size: 2rem;
    font-family: "Cuprum", sans-serif;

    margin-top: 40px;
    margin-bottom: 5px;
    color: #f5f7f9;
  `;
  return (
    <PageContainer>
      <PageTitle>Edit Your Fx's Details Here</PageTitle>
      <EditFxForm />
    </PageContainer>
  );
}
