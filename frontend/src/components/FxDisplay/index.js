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
      <div className="page-container">
        <div className="main-section">
          <div className="section">
            <h2 className="section-title">Trending</h2>
            <div className="section-content"></div>
          </div>
          <div className="section">
            <h2 className="section-title">Newly Added</h2>
            <div className="section-content"></div>
          </div>
        </div>
      </div>
      {/* <div className="home__container">
        <SideNav />
        <div className="home__footer">
          <Footer />
        </div>
      </div> */}
    </>
  );
};

export default FxDisplay;
