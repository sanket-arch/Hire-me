import "./styles/company.css";
import Nav from "./Nav";
import Footer from "./Footer";
import JobCard from "./JobCard";
import { useState } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../config/Firebase";

const jobRef = collection(db, "jobs");
async function getdata(setJobs, setUser) {
  try {
    const user = await JSON.parse(localStorage.getItem("details"));
    setUser(user);
    const jobarray = await query(
      jobRef,
      where("postedBy", "==", user.id),
      orderBy("lastdate", "desc")
    );
    onSnapshot(jobarray, (snapshot) => {
      let joblist = [];
      snapshot.docs.forEach((doc) => {
        joblist.push({ ...doc.data(), id: doc.id });
      });
      setJobs(joblist);
    });
  } catch (err) {
    console.log(err);
  }
}
const Company = () => {
  const [jobs, setJobs] = useState([]);
  const [user, setUser] = useState(null);
  getdata(setJobs, setUser);
  return (
    <div>
      <Nav usertype="Company" />
      <div id="company">
        <h2>All Posted Job</h2>

        <div id="search-posted-job">
          <input type="text" placeholder="serach role" />
          <button>search</button>
        </div>
        <div id="job-cards">
          {jobs &&
            jobs.map((job, idx) => {
              return (
                <JobCard
                  key={idx}
                  companyname={user.name}
                  location={job.location}
                  role={job.role}
                  skills={job.skills}
                  stipend={job.stipend}
                />
              );
            })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Company;
