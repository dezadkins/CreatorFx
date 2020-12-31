import "./HomePage.css";
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
      <SideNav />
    </>
  );
};

export default FxDisplay;
