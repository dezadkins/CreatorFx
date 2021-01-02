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
    width: 400px;
    z-index: 1;
  `;

  const PageTitle = styled.h1`
    display: inline;
    font-size: 1.5rem;
    margin-top: 40px;
    margin-bottom: 15px;
    color: #f5f7f9;
  `;
  return (
    <PageContainer>
      <PageTitle>Edit your Fx's details to share it.</PageTitle>
      <EditFxForm />
    </PageContainer>
  );
}
