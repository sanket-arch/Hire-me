import "./styles/Login.css";
import Spinner from "react-bootstrap/Spinner";
import Footer from "./Footer";
import HomeNavbar from "./HomeNav";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useContext, useState, useReducer } from "react";
import { auth, db } from "../config/Firebase";
import { useNavigate } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { userContext } from "../App";
function reducer(state, action) {
  let errcode = action.errmsg;
  switch (errcode) {
    case "auth/wrong-password":
      return { errmsg: "Wrong Password" };
    case "auth/user-not-found":
      return { errmsg: "No user exist" };
    case "auth/network-request-failed":
      return { errmsg: "Internet connection failure" };
    default:
      return { errmsg: "Something went wrong" };
  }
}
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Applicant");
  const [isLoggingIn, setisLoggingIn] = useState(false);
  const [errorOccured, setErroroccured] = useState(false);
  const [errormsg, errorDispatch] = useReducer(reducer, { errmsg: "" });
  const navigate = useNavigate();
  const user = useContext(userContext);
  const login = (e) => {
    e.preventDefault();
    setisLoggingIn(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        const userRef = doc(db, role.toLowerCase(), cred.user.uid);
        getDoc(userRef)
          .then((doc) => {
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("user", JSON.stringify(doc.data()));
            localStorage.setItem("role", role);
            user.setUserdetails(JSON.parse(localStorage.getItem("user")));
          })
          .catch((err) => {
            console.log(err.code);
          });

        setisLoggingIn(false);
        role === "Applicant" ? navigate("/applicant") : navigate("/company");
      })
      .catch((err) => {
        setisLoggingIn(false);
        setErroroccured(true);
        errorDispatch({ errmsg: err.code });
      });
  };
  return (
    <>
      <HomeNavbar />
      <div id="login-body">
        <h3 id="login-head">Login</h3>
        {errorOccured && (
          <div id="err-msg">
            <p>{errormsg.errmsg}</p>
            <i
              className="fa-solid fa-xmark"
              onClick={() => {
                setErroroccured(false);
              }}
            ></i>
          </div>
        )}
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
          {!isLoggingIn && <button className="login-button login-btn-noloading">Login</button>}
          {isLoggingIn && (
            <button className="login-button loading-btn" >
              <Spinner animation="border" />
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
