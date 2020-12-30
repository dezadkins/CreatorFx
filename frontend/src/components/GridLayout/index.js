import SideNav from "../SideNav";
import "./GridLayout.css";
import "../SideNav/SideNav.css";
export default function GridLayout() {
  return (
    <>
      {/* <div></div> */}
      <div className="container">
        <div className="sidebar">
          <div className="side__nav-container">
            <SideNav />
          </div>
        </div>
        <div className="main-content">
          <div className="header ">
            <p>header</p>
          </div>
          <p>main</p>
          <div></div>
        </div>
      </div>
      {/* <div className="container">
        <footer class="footer">
          <p>footer</p>
        </footer>
      </div> */}
    </>
  );
}
