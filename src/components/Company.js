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
// function getdata(setJobs, setUser) {
//     const user = JSON.parse(localStorage.getItem("details"));
//     setUser(user);
//     const jobarray =  query(
//       jobRef,
//       where("postedBy", "==", user.id),
//       orderBy("lastdate", "desc")
//     );
//     onSnapshot(jobarray, (snapshot) => {
//       let joblist = [];
//       snapshot.docs.forEach((doc) => {
//         joblist.push({ ...doc.data(), id: doc.id });
//       });
//       setJobs(joblist);
//     });
// }
const Company = () => {
  const [jobs, setJobs] = useState([]); 
  const [isLoading, setLoading] = useState(true);
  const userC = JSON.parse(localStorage.getItem("details"));

  const jobarray = query(
    jobRef,
    where("postedBy", "==", userC.id),
    orderBy("lastdate", "desc")
  );
  onSnapshot(jobarray, (snapshot) => {
    let joblist = [];
    snapshot.docs.forEach((doc) => {
      joblist.push({ ...doc.data(), id: doc.id });
    });
    setJobs(joblist);
    setLoading(false);
  });
  return (
    <div>
      <Nav usertype="Company" />
      {isLoading&& <p id="loading-msg">Loading...</p>}
      {!isLoading &&<div id="company">
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
                  jobId={job.id}
                  companyname={userC.name}
                  location={job.location}
                  role={job.role}
                  skills={job.skills}
                  stipend={job.stipend}
                />
              );
            })}
        </div>
      </div>}
      <Footer />
    </div>
  );
};

export default Company;
