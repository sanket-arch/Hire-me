import Footer from "./Footer";
import Nav from "./Nav";
import "./styles/postjob.css";
import { userContext } from "../App";
import { useContext } from "react";
const jobdetails = {
  postedBy: "",
  role: "",
  skills: "",
  jobdescription: "",
  stipend: "",
  location: "",
  lastdate: "",
};

const Postjob = () => {
  const userdetails = useContext(userContext);
  const postJob = (e) => {
    e.preventDefault();
    if (userdetails.userdetails != null)
      console.log(userdetails.userdetails.id);
  };
  return (
    <>
      <Nav usertype="Company" />
      <div id="postjob-body">
        <h2>Post new Job</h2>
        <form id="postjob-form" onSubmit={postJob}>
          <label htmlFor="postedby">Posted By</label>
          <br />
          <input type="text" name="postedby" />
          <br />
          <label htmlFor="role">Role</label>
          <br />
          <input type="text" name="role" />
          <br />
          <label htmlFor="skills">Skills</label>
          <br />
          <input type="text" name="skills" />
          <br />
          <label htmlFor="jobdescription">Job description</label>
          <br />
          <textarea
            name="jobdescription"
            id="jobdescription"
            cols="5"
            rows="5"
          />
          <br />
          <label htmlFor="Stipend">Stipend</label>
          <br />
          <input type="text" name="Stipend" />
          <br />
          <label htmlFor="location">Location</label>
          <br />
          <input type="text" name="location" />
          <br />
          <label htmlFor="lastdate">Last Date</label>
          <br />
          <input type="date" name="lastdate" />
          <br />
          <button id="jobpost-button">Post</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Postjob;
