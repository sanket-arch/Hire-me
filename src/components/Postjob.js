import Footer from "./Footer";
import Nav from "./Nav";
import "./styles/postjob.css";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/Firebase";
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
  const navigate = useNavigate();
  const jobRef = collection(db, "jobs");
  const postJob = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("details"));
    jobdetails.postedBy = user.id;
    addDoc(jobRef, jobdetails).then(() => {
      console.log("job added");
      navigate("/company");
    });
  };
  return (
    <>
      <Nav usertype="Company" />
      <div id="postjob-body">
        <h2>Post new Job</h2>
        <form id="postjob-form" onSubmit={postJob}>
          <label htmlFor="role">Role</label>
          <br />
          <input
            type="text"
            name="role"
            onChange={(e) => {
              jobdetails.role = e.target.value;
            }}
          />
          <br />
          <label htmlFor="skills">Skills</label>
          <br />
          <input
            type="text"
            name="skills"
            onChange={(e) => {
              jobdetails.skills = e.target.value;
            }}
          />
          <br />
          <label htmlFor="jobdescription">Job description</label>
          <br />
          <textarea
            name="jobdescription"
            id="jobdescription"
            cols="5"
            rows="5"
            onChange={(e) => {
              jobdetails.jobdescription = e.target.value;
            }}
          />
          <br />
          <label htmlFor="Stipend">Stipend</label>
          <br />
          <input
            type="text"
            name="Stipend"
            onChange={(e) => {
              jobdetails.stipend = e.target.value;
            }}
          />
          <br />
          <label htmlFor="location">Location</label>
          <br />
          <input
            type="text"
            name="location"
            onChange={(e) => {
              jobdetails.location = e.target.value;
            }}
          />
          <br />
          <label htmlFor="lastdate">Last Date</label>
          <br />
          <input
            type="date"
            name="lastdate"
            onChange={(e) => {
              jobdetails.lastdate = e.target.value;
            }}
          />
          <br />
          <button id="jobpost-button">Post</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Postjob;
