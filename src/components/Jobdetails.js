import { useNavigate, useParams } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";
import "./styles/jobdetails.css";
import { useEffect, useState } from "react";
import { deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../config/Firebase";

const Jobdetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [isloading, setLoading] = useState(true);
  const [job, setJob] = useState(null);
  const [company, setCompany] = useState(null);
  // const companyname = JSON.parse(localStorage.getItem("details"));
  const role = localStorage.getItem("role");

  const deleteJob = (e) => {
    const jobRef = doc(db, "jobs", params.postid);
    deleteDoc(jobRef).then(() => {
      setLoading(true);
      navigate("/company");
    });
  };
  const goBack = () => {
    role === "Company" ? navigate("/company") : navigate("/applicant");
  };
  useEffect(() => {
    function fetchdata() {
      const jobRef = doc(db, "jobs", params.postid);
      onSnapshot(jobRef, (snapshot) => {
        const companyRef = doc(db, "company", snapshot.data().postedBy);
        onSnapshot(companyRef, (csnapshot) => {
          setCompany(csnapshot.data());
          console.log(csnapshot.data());
          setLoading(false);
        });
        console.log(snapshot.data().postedBy);
        setJob(snapshot.data());
      });
    }
    fetchdata();
  }, [params]);

  // const handleStatus = (e) => {
  //   let status;
  //   if (e.target.value === "Active") {
  //     status = "Disable";
  //   } else status = "Active";
  //   updateDoc(jobRef, {
  //     status: status,
  //   });
  // };

  return (
    <>
      <Nav usertype="Company" />
      {isloading && <p id="loading-msg">Loading...</p>}
      {!isloading && (
        <div id="job-details">
          <h3 id="job-title">{job.role}</h3>
          <h4 id="jobpostedBY">Posted By: {company.name}</h4>
          <div id="jobInformation">
            <section id="top">
              <section className="last-date">
                <p>Apply Before:</p> {job.lastdate}
              </section>
              <section className="job-location">
                <i className="fa-solid fa-location-dot"></i>
                {job.location}
              </section>
              <section id="stipend">
                <p>Stipend:</p>${job.stipend}
              </section>
            </section>
            <section id="middle">
              <section className="skills">
                <h4>Skills:</h4>
                <p> {job.skills}</p>
              </section>
              <section className="about-job">
                <h4>About Job:</h4>
                <p>{job.jobdescription}</p>
              </section>
            </section>
            <section id="bottom">
              <button id="goback" onClick={goBack}>
                Go back
              </button>
              {role === "Company" ? (
                <>
                  {job.status === "Active" ? (
                    <button id="jobstatus-switch" vlaue="disable">
                      disable
                    </button>
                  ) : (
                    <button id="jobstatus-switch" value="Active">
                      Active
                    </button>
                  )}

                  <button id="delete-job" onClick={deleteJob}>
                    delete
                  </button>
                </>
              ) : (
                <button id="apply-button">Apply</button>
              )}
            </section>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Jobdetails;
