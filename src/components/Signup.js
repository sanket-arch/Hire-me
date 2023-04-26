import { useState } from "react";
import Footer from "./Footer";
import HomeNavbar from "./HomeNav";
import { auth, db } from "../config/Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import "./styles/signup.css";
import { useNavigate } from "react-router-dom";

const applicant = {
  id: "",
  name: "",
  email: "",
  mobile: "",
  resume_link: "",
  linkdin_link: "",
};
const company = {
  id: "",
  name: "",
  email: "",
  mobile: "",
  about: "",
  address: "",
  linkdin_link: "",
  websiteLink: "",
};

const Signup = () => {
  const [isauthenticating, setIsAuthenticating] = useState(false);
  const [role, setRole] = useState("Applicant");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const applicantCollectionRef = collection(db, "applicant");
  // const companyCollectionRef = collection(db, "company");
  const navigate = useNavigate();

  const signUp = (e) => {
    e.preventDefault();
    setIsAuthenticating(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        const applicantCollectionRef = doc(db, "applicant", cred.user.uid);
        const companyCollectionRef = doc(db, "company", cred.user.uid);
        setIsAuthenticating(false);
        if (role === "Applicant") {
          applicant.email = cred.user.email;
          applicant.id = cred.user.uid;
          setDoc(applicantCollectionRef, applicant).then(() => {
            console.log("Add animation to show user created account");
            
          });
        }
        if (role === "Company") {
          company.email = cred.user.email;
          company.id = cred.user.uid;
          setDoc(companyCollectionRef, company).then(() => {
            console.log("Add animation to show company created account");
          });
        }
        navigate("/");
      })
      .catch((error) => {
        setIsAuthenticating(false);
        switch (error.code) {
          case "auth/email-already-in-use":
            alert(`Email address ${email} already in use.`);
            break;
          case "auth/invalid-email":
            console.log(`Email address ${email} is invalid.`);
            break;
          case "auth/operation-not-allowed":
            console.log(`Error during sign up.`);
            break;
          case "auth/weak-password":
            console.log(
              "Password is not strong enough. Add additional characters including special characters and numbers."
            );
            break;
          default:
            console.log(error.message);
            break;
        }
      });
  };

  return (
    <>
      <HomeNavbar />
      <div id="sigup-body">
        <h3 id="signup-head">Sign Up</h3>
        <form id="signup-from" onSubmit={signUp}>
          <label htmlFor="Name">Name</label>
          <br />
          <input
            type="text"
            onChange={(e) => {
              applicant.name = e.target.value;
              company.name = e.target.value;
            }}
          />
          <br />
          <label htmlFor="Email">Email</label>
          <br />
          <input
            type="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
          <br />

          <label htmlFor="phone">Phone</label>
          <br />
          <input
            type="text"
            onChange={(e) => {
              applicant.mobile = e.target.value;
              company.mobile = e.target.value;
            }}
          />
          <br />
          <label htmlFor="role">You are</label>
          <br />
          <select
            name="Role"
            id="roleSelect"
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
          {role === "Applicant" && (
            <>
              <label htmlFor="resume-Link">Resume link</label>
              <br />
              <input
                type="text"
                onChange={(e) => {
                  applicant.resume_link = e.target.value;
                }}
              />
              <br />
            </>
          )}
          {role === "Company" && (
            <>
              <label htmlFor="About">About</label>
              <br />
              <textarea
                type="text"
                rows={5}
                cols={50}
                onChange={(e) => {
                  company.about = e.target.value;
                }}
              />
              <br />
              <label htmlFor="Address">Address</label>
              <br />
              <input
                type="text"
                onChange={(e) => {
                  company.address = e.target.value;
                }}
              />
              <br />
              <label htmlFor="website-link">Website link</label>
              <br />
              <input
                type="text"
                onChange={(e) => {
                  company.websiteLink = e.target.value;
                }}
              />
              <br />
            </>
          )}
          <label htmlFor="linkdin-Link">LinkdIn link</label>
          <br />
          <input
            type="text"
            onChange={(e) => {
              applicant.linkdin_link = e.target.value;
              company.linkdin_link = e.target.value;
            }}
          />
          <br />
          <label htmlFor="Password">Password</label>
          <br />
          <input
            type="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
          <br />
          {!isauthenticating && <button id="signup-button">sign up</button>}
          {isauthenticating && (
            <button id="signup-button" disabled>
              signning up...
            </button>
          )}
          <br />
        </form>
        <button id="signup-with-google">SignUp With Google</button>
      </div>
      <Footer />
    </>
  );
};

export default Signup;
