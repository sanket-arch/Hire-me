import "./styles/company.css";
import Nav from "./Nav";
import Footer from "./Footer";
import JobCard from "./JobCard";
import { useEffect, useState } from "react";
import { collection, getDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../config/Firebase";

const Applicant = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [company, setCompany] = useState({});
  useEffect(() => {
    function fetchdata() {
      const jobRef = collection(db, "jobs");
      getDocs(jobRef).then((snapshot) => {
        let joblist = [];
        snapshot.docs.forEach((jdoc) => {
          const jobdocRef = doc(db, "company", jdoc.data().postedBy);
          getDoc(jobdocRef).then((jobdoc) => {
            setCompany(jobdoc.data());
          });

          joblist.push({
            ...jdoc.data(),
            id: jdoc.id,
          });
        });
        setJobs(joblist);
        setLoading(false);
      });
    }
    fetchdata();
  }, []);

  return (
    <div>
      <Nav usertype="Applicant" />
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
      )}
      <Footer />
    </div>
  );
};

export default Applicant;
