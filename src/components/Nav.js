import { signOut } from "firebase/auth";
import { auth } from "../config/Firebase";
import { useNavigate, Link } from "react-router-dom";
import "./styles/nav.css";
const Nav = (props) => {
  const navigate = useNavigate();
  const logout = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      navigate("/");
    });
  };
  return (
    <div id="nav-users">
      <Link to="/" id="logo">
        Hire-me
      </Link>
      <div id="links-users">
        {props.usertype === "Applicant" && (
          <>
            <Link to="/applicant">All Jobs</Link>
            <Link to="/applied">Applied Jobs</Link>
            <Link to="/interview">My Interviews</Link>
          </>
        )}
        {props.usertype === "Company" && (
          <>
            <Link to="/company">All Jobs</Link>
            <Link to="/PostJobs">Post Job</Link>
            <Link to="/applieAapplicant">View Applicant</Link>
          </>
        )}
        <Link to="applicantProfile">
          <i className="fa-regular fa-user" id="user-img"></i>
        </Link>
        <button onClick={logout} id="logout-button">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Nav;
