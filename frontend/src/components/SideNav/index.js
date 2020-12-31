import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import { NavLink, useHistory } from "react-router-dom";
import { logout } from "../../store/session";
import "./SideNav.css";
import SearchBar from "../Navigation/SearchBar";
import HomeIcon from "@material-ui/icons/Home";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import CollectionsIcon from "@material-ui/icons/Collections";

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
        <ul className="nav-items">
          <li>
            <SearchBar />
          </li>
          <li>
            <NavLink
              className="link-style"
              activeStyle={{ color: "red" }}
              to="/home"
            >
              <HomeIcon />
              <h3>Home</h3>
            </NavLink>
          </li>
          <li>
            <NavLink
              className="link-style"
              activeStyle={{ color: "red" }}
              to="/fxes/new"
            >
              <CloudUploadIcon />
              <h3>Upload</h3>
            </NavLink>
          </li>
          <li>
            <NavLink
              className="link-style"
              activeStyle={{ color: "#c054eb" }}
              to={`/users/${userId}`}
            >
              <CollectionsIcon />
              <h3>My Collection</h3>
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}
