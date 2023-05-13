import "./styles/applied.css";
import Nav from "./Nav";
import JobCard from "./JobCard";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/Firebase";
const Appliedjob = () => {
  const [appliedjobs, setAppliedjobs] = useState({});
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    const username = JSON.parse(localStorage.getItem("user"));
    const appliedref = collection(db, "applied");
    const appliedJobArr = query(
      appliedref,
      where("appliedby.id", "==", username.id)
    );
    getDocs(appliedJobArr).then((snapshot) => {
      let joblist = [];
      snapshot.docs.forEach((jdoc) => {
        joblist.push({ ...jdoc.data(), id: jdoc.id });
      });
      setAppliedjobs(joblist);
      console.log(joblist);
      setisLoading(false);
    });
  }, []);
  return (
    <>
      <Nav usertype="Applicant" />
      {isLoading && <div id="loading-msg">Loading...</div>}
      {!isLoading && (
        <div id="applied-body">
          <h2>All Applied Job</h2>
          <div id="search-applied-job">
            <input type="text" placeholder="serach role" />
            <button>search</button>
          </div>
          <div id="job-cards">
            {appliedjobs &&
              appliedjobs.map((job, idx) => {
                return (
                  <JobCard
                    key={job.Appliedfor.id}
                    jobId={job.Appliedfor.id}
                    // companyname={job.companyname}
                    location={job.Appliedfor.location}
                    role={job.Appliedfor.role}
                    skills={job.Appliedfor.skills}
                    stipend={job.Appliedfor.stipend}
                  />
                );
              })}
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Appliedjob;
