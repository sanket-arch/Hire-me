import "./styles/Login.css";
import Footer from "./Footer";
import HomeNavbar from "./HomeNav";
import { userContext } from "../App";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState, useContext } from "react";
import { auth, db } from "../config/Firebase";
import { useNavigate } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Applicant");
  const [isLoggingIn, setisLoggingIn] = useState(false);
  const navigate = useNavigate();
  const userdetails=useContext(userContext);
  const login = (e) => {
    e.preventDefault();
    setisLoggingIn(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        console.log(cred.user.uid);
        const userRef = doc(db, role.toLowerCase(), cred.user.uid);
        getDoc(userRef)
          .then((doc) => {
            console.log(doc.data());
            userdetails.setUserdetails(doc.data());
          })
          .catch((err) => {
            console.log(err);
          });

        setisLoggingIn(false);
        role === "Applicant" ? navigate("/applicant") : navigate("/company");
      })
      .catch((err) => {
        setisLoggingIn(false);
        console.log(err);
      });
  };
  return (
    <>
      <HomeNavbar />
      <div id="login-body">
        <h3 id="login-head">Login</h3>
        <form id="login-form" onSubmit={login}>
          <label htmlFor="Email">Email</label>
          <br />
          <input
            type="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <br /> <label htmlFor="Password">Password</label>
          <br />
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <br />
          <label htmlFor="role">You are</label>
          <br />
          <select
            name="Role"
            id="loginRoleSelect"
            onChange={(e) => {
              setRole(e.target.value);
            }}
          >
            <option disabled value>
              -- select an option --
            </option>
            <option value="Applicant">Applicant</option>
            <option value="Company">Company</option>
          </select>
          <br />
          {!isLoggingIn && <button id="login-button">Login</button>}
          {isLoggingIn && (
            <button id="login-button" disabled>
              Logiing In...
            </button>
          )}
        </form>
        <button id="Login-with-google">Login With Google</button>
      </div>
      <Footer />
    </>
  );
};

export default Login;
