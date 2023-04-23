import "./styles/Login.css";
import Footer from "./Footer";
import HomeNavbar from "./HomeNav";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../config/Firebase";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const login = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        console.log(cred.user, ",,,, " + cred.user.uid);
        navigate("/applicant");
      })
      .catch((err) => {
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
          <button id="login-button">Login</button>
        </form>
        <button id="Login-with-google">Login With Google</button>
      </div>
      <Footer />
    </>
  );
};

export default Login;
