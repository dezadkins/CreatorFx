import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import { NavLink, useHistory } from "react-router-dom";
import { logout } from "../../store/session";
import "./SideNav.css";
import SearchBar from "../Navigation/SearchBar";

export default function SideNav() {
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
      <div>
        <div className="side__nav-item" onClick={logoClick}>
          <img className="side__nav-logo" src="/CFxLogo.png" alt="logo" />
        </div>
        <div className="side__nav-item">
          <div className="side__nav-link">
            <SearchBar />
          </div>
        </div>
        <div className="side__nav-item">
          <NavLink className="side__nav-link" to={`/home`}>
            <span className="nav-title">Home</span>
          </NavLink>
        </div>
        <div className="side__nav-item">
          <NavLink className="side__nav-link" to={`/uploads`}>
            <span className="nav-title">Upload</span>
          </NavLink>
        </div>
        <div className="side__nav-item">
          <NavLink className="side__nav-link" to={`/collection`}>
            <span className="nav-title">My Collection</span>
          </NavLink>
        </div>
      </div>
    </>
  );
}
