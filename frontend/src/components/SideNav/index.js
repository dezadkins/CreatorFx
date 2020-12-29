import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import { NavLink, useHistory } from "react-router-dom";
import { logout } from "../../store/session";
import "./SideNav.css";

export default function SideNav() {
  const dispatch = useDispatch();
  const history = useHistory();

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push("/");
  };

  return (
    <>
      <div className="side__nav-container">
        <div className="side__nav-item">
          <NavLink className="side__nav-link" to={`/collection`}>
            <span className="nav-title">My Collection</span>
          </NavLink>
        </div>
        <div className="side__nav-item">
          <NavLink className="side__nav-link" to={`/uploads`}>
            <span className="nav-title">Upload</span>
          </NavLink>
        </div>
        <div className="side__nav-item">
          <NavLink className="side__nav-link" to={`/home`}>
            <span className="nav-title">Home</span>
          </NavLink>
        </div>
        <div className="side__nav-item">
          <div className="side__nav-link">
            <span className="nav-title">Search</span>
          </div>
        </div>
      </div>
    </>
  );
}
