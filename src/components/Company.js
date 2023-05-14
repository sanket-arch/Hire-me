import "./styles/company.css";
import Nav from "./Nav";
import Footer from "./Footer";
import JobCard from "./JobCard";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  where,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../config/Firebase";
const userC = JSON.parse(localStorage.getItem("user"));
const Applicant = () => {
  const [jobs, setJobs] = useState({});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    function fetchdata() {
      const jobRef = collection(db, "jobs");
      const jobarray = query(
        jobRef,
        where("postedBy.id", "==", userC.id),
        orderBy("lastdate", "desc")
      );
      getDocs(jobarray).then((snapshot) => {
        let joblist = [];
        snapshot.docs.forEach((jdoc) => {
          joblist.push({ ...jdoc.data(), id: jdoc.id, companyname: userC.name });
        });
        setJobs(joblist);
        setLoading(false);
      });
    }
    fetchdata();
  }, []);

  return (
    <div>
      <Nav usertype="Company" />
      {isLoading && <p id="loading-msg">Loading...</p>}
      {!isLoading && (
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
                    jobId={job.id}
                    companyname={job.companyname}
                    location={job.location}
                    role={job.role}
                    skills={job.skills}
                    stipend={job.stipend}
                  />
                );
              })}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Applicant;
