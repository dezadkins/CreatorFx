import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import "./LandingPage.css";
import LoginFormModal from "../LoginFormModal";
import SignupFormPage from "../SignupFormPage";
import Footer from "../Footer";
import styled from "styled-components";

const VidOverlay = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
`;

const LandingPage = () => {
  const history = useHistory();
  const logoClick = (e) => {
    history.push("/");
  };

  return (
    <>
      <div className="nav__container">
        <div className="navbar__logo" onClick={logoClick}>
          <img className="logo" src="/CFxLogo.png" alt="logo" />
        </div>
        <div className="nav__right">
          <LoginFormModal />
          <SignupFormPage />
        </div>
      </div>

      <div>
        <video className="videoBG" poster="poster.JPG" autoPlay muted loop>
          <source
            src={window.location.origin + "/soundwave.mp4"}
            type="video/mp4"
          />
        </video>
        <VidOverlay></VidOverlay>

        <div className="footer__box">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default LandingPage;
