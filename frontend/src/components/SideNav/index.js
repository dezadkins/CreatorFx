import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import { NavLink, useHistory } from "react-router-dom";
import { logout } from "../../store/session";
import "./SideNav.css";
import SearchBar from "../Navigation/SearchBar";
import HomeIcon from "@material-ui/icons/Home";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import CollectionsIcon from "@material-ui/icons/Collections";
import styled from "styled-components";

const SideNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #f5f7f9;
  transition: color 0.3s ease-in;
  &:hover {
    color: red;
  }
  &:active {
    color: red;
  }
`;

export default function SideNav({ userId }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push("/");
  };

  const logoClick = (e) => {
    history.push("/home");
  };

  return (
    <>
      <div className="sidebar">
        <div className="side-logo-container" onClick={logoClick}>
          <img className="side__nav-logo" src="/CFxLogo.png" alt="logo" />
        </div>
        <SearchBar />
        <ul className="nav-items">
          <li>
            <SideNavLink activeStyle={{ color: "red" }} to="/home">
              <HomeIcon />
              <h3 className="nav-item-title">Home</h3>
            </SideNavLink>
          </li>
          <li>
            <SideNavLink activeStyle={{ color: "red" }} to="/fxes/new">
              <CloudUploadIcon />
              <h3 className="nav-item-title">Upload</h3>
            </SideNavLink>
          </li>
          <li>
            <SideNavLink
              activeStyle={{ color: "#ff0031" }}
              to={`/users/${userId}`}
            >
              <CollectionsIcon />
              <h3 className="nav-item-title">My Collection</h3>
            </SideNavLink>
          </li>
        </ul>
      </div>
    </>
  );
}
