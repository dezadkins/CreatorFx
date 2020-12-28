import "./FxDisplay.css";
import Footer from "../Footer";
import { useHistory } from "react-router-dom";
// import ProfileButton from "./components/Navigation/ProfileButton";
const FxDisplay = () => {
  const history = useHistory();
  const logoClick = (e) => {
    history.push("/home");
  };
  return (
    <>
      <div className="home__container">
        <div className="navbar__logo" onClick={logoClick}>
          <img className="logo" src="/CFxLogo.png" alt="logo" />
        </div>
        <h1>Fx Display</h1>
        {/* <ProfileButton /> */}

        {/* <div className="mid-section">
        <h2>Fx Grid here</h2>
        <div className="wrapper">
          <div className="box1">1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
        </div>
      </div> */}
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default FxDisplay;
