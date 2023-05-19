import "./styles/company.css";
import Nav from "./Nav";
import Footer from "./Footer";
import JobCard from "./JobCard";
import { useEffect, useState } from "react";
import { collection, getDocs, where, orderBy, query } from "firebase/firestore";
import { db } from "../config/Firebase";
const userC = JSON.parse(localStorage.getItem("user"));
const Applicant = () => {
  const [jobs, setJobs] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [isAnyjobs, setIsAnyjobs] = useState(true);
  useEffect(() => {
    function fetchdata() {
      setLoading(true);
      const jobRef = collection(db, "jobs");
      const jobarray = query(
        jobRef,
        where("postedBy.id", "==", userC.id),
        orderBy("lastdate", "desc")
      );
      getDocs(jobarray).then((snapshot) => {
        let joblist = [];
        snapshot.docs.forEach((jdoc) => {
          joblist.push({
            ...jdoc.data(),
            id: jdoc.id,
            companyname: userC.name,
          });
        });
        setJobs(joblist);
        if (joblist.length === 0) {
          setIsAnyjobs(true);
        } else {
          setIsAnyjobs(false);
        }
        setLoading(false);
      });
    }
    fetchdata();
  }, []);

  return (
    <>
      <Nav usertype="Company" />
      <div id="company-page">
        <h2>All Posted Job</h2>
        <div id="search-posted-job">
          <input type="text" placeholder="serach role" />
          <button>search</button>
        </div>
        {isLoading && <p id="loading-msg">Loading...</p>}
        {!isLoading && (
          <div id="company">
            {isAnyjobs && <p id="Empty-message">You haven't posted any job</p>}
            <div id="job-cards">
              {jobs.map((job, idx) => {
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
      </div>
      <Footer />
    </>
  );
};

export default Applicant;
