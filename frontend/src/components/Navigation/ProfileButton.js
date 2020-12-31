import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import { Link, useHistory } from "react-router-dom";

import fetch from "../../store/csrf";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const [profilePic, setProfilePic] = useState(null);

  const sessionUser = useSelector((state) => state.session.user);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  useEffect(() => {
    (async () => {
      let res = await fetch(`/api/session`);
      setProfilePic(res.data.user.profilePicURL);
    })();
  }, [sessionUser]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push("/");
  };

  return (
    <>
      <div onClick={openMenu} className="navbar__user-container">
        <div className="navbar__user-container-dropdown">
          <i className="fas fa-caret-down"></i>
        </div>
        {profilePic && (
          <img
            className="navbar__profile-icon"
            src={
              profilePic + `?uniqueQuery=${encodeURI(new Date().toISOString())}`
            }
            alt=""
          />
        )}
        {!profilePic && (
          <FontAwesomeIcon
            icon={faUserCircle}
            className="navbar__profile-icon--default"
          />
        )}

        <div
          className={`navbar__profile-dropdown ${
            showMenu
              ? "navbar__profile-dropdown--shown"
              : "navbar__profile-dropdown--hidden"
          }`}
        >
          <div className="navbar__dropdown-user-info">
            <div className="navbar__dropdown-text">{sessionUser.username}</div>
            <div className="navbar__dropdown-text">{sessionUser.email}</div>
          </div>
          <div className="navbar__dropdown-links">
            <Link className="navbar__dropdown-link" to="/profile">
              My Profile
            </Link>
            <Link className="navbar__dropdown-link" to="/newcollection">
              Create New Collection
            </Link>
            <div className="navbar__dropdown-link" onClick={logout}>
              Log Out
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileButton;
