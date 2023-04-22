import { useState } from "react";
import Footer from "./Footer";
import HomeNavbar from "./HomeNav";
import "./styles/signup.css";
const Signup = () => {
  const [role, setRole] = useState(" ");
  return (
    <>
      <HomeNavbar />
      <div id="sigup-body">
        <h3 id="signup-head">Sign Up</h3>
        <form id="signup-from">
          <label htmlFor="Name">Name</label>
          <br />
          <input type="text" />
          <br />
          <label htmlFor="Email">Email</label>
          <br />
          <input type="Email" />
          <br />

          <label htmlFor="phone">Phone</label>
          <br />
          <input type="text" />
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
            <option disabled selected value>
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
              <input type="text" />
              <br />
            </>
          )}
          {role === "Company" && (
            <>
              <label htmlFor="About">About</label>
              <br />
              <textarea type="text" rows={10} cols={50} />
              <br />
              <label htmlFor="Address">Address</label>
              <br />
              <input type="text" />
              <br />
              <label htmlFor="website-link">Website link</label>
              <br />
              <input type="text" />
              <br />
            </>
          )}
          <label htmlFor="linkdin-Link">LinkdIn link</label>
          <br />
          <input type="text" />
          <br />
          <label htmlFor="Password">Password</label>
          <br />
          <input type="Password" />
          <br />
          <button id="signup-button">Submit</button>
          <br />
        </form>
        <button id="signup-with-google">SignUp With Google</button>
      </div>
      <Footer />
    </>
  );
};

export default Signup;
