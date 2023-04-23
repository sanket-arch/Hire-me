import Footer from "./Footer";
import HomeNavbar from "./HomeNav";
import "./styles/Home.css";
import { ReactComponent as Svgimg } from "../utils/herosvg.svg";
const Home = () => {
  return (
    <>
      <HomeNavbar />

      <div id="home-body">
        <div id="tagline">
          <h1>welcome!</h1>
          <p>Find yourself at better place</p>
        </div>
        <div id="hero-img">
          <Svgimg id="svg"/>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
