import "./styles/HomeNav.css";
import { Link } from "react-router-dom";
const HomeNavbar = () => {
  return (
    <nav id="navbar-home">
      <Link to="/" id="logo">
        Hire-me
      </Link>
      <div id="navlinks">
        <Link to="/signup" id="signup">
          Signup
        </Link>
        <Link to="/login" id="login">
          Login
        </Link>
      </div>
    </nav>
  );
};

export default HomeNavbar;
