import React from "react";
// import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
// import LoginFormModal from "../LoginFormModal";
// import SignupFormPage from "../SignupFormPage";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = <></>;
  }

  return (
    <div className="navbar__container">
      <div className="navbar_links"> {isLoaded && sessionLinks}</div>
    </div>
  );
}

export default Navigation;
