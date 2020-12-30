import "./FxDisplay.css";
import Footer from "../Footer";
import { useHistory } from "react-router-dom";
import SideNav from "../SideNav";

// import ProfileButton from "./components/Navigation/ProfileButton";
const FxDisplay = () => {
  const history = useHistory();
  const logoClick = (e) => {
    history.push("/home");
  };
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
          <br />
          <br />
          <br />
          <p>Trending</p>
          <div class="inner-grid">
            <div class="item">1</div>
            <div class="item">2</div>
            <div class="item">3</div>
            <div class="item">4</div>
          </div>
          <p>Newly Added</p>
          <div class="inner-grid">
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
          </div>
        </div>
      </div>
      {/* <div className="container">
        <footer class="footer">
          <p>footer</p>
        </footer>
      </div> */}
    </>
  );
};

export default FxDisplay;
