import "./styles/applicant.css";
import Nav from "./Nav";
import Footer from "./Footer";
import JobCard from "./JobCard";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/Firebase";

const Applicant = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [company, setCompany] = useState({});
  const [isAnyjobs, setIsAnyjobs] = useState(true);
  useEffect(() => {
    function fetchdata() {
      const jobRef = collection(db, "jobs");
      getDocs(jobRef).then((snapshot) => {
        let joblist = [];
        snapshot.docs.forEach((jdoc) => {
          setCompany(jdoc.data().postedBy);
          joblist.push({
            ...jdoc.data(),
            id: jdoc.id,
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
      <Nav usertype="Applicant" />
      <div id="applicant-page">
        <h2>All Posted Job</h2>
        <div id="search-posted-job">
          <input type="text" placeholder="serach role" />
          <button>search</button>
        </div>
        {isLoading && <p id="loading-msg">Loading...</p>}
        {!isLoading && (
          <div id="all-jobHolder">
            {isAnyjobs && <p id="Empty-message">No Job Available Yet</p>}
            <div id="job-cards">
              {jobs &&
                jobs.map((job, idx) => {
                  return (
                    <JobCard
                      key={idx}
                      jobId={job.id}
                      companyname={company.name}
                      location={job.location}
                      role={job.role}
                      skills={job.skills}
                      stipend={job.stipend}
                    />
                  );
                })}
            </div>
          </div>
        )}{" "}
      </div>
      <Footer />
    </>
  );
};

export default Applicant;
