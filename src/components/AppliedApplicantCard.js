import { useNavigate } from "react-router-dom";
import "./styles/appliedApplicantCard.css";
import { addDoc, doc, collection, deleteDoc, getDoc } from "firebase/firestore";
import { db } from "../config/Firebase";
const AppliedApplicantCard = (props) => {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  const handleViewjob = () => {
    navigate("/posts/" + props.jobid);
  };
  const handleinterviewcall = () => {
    const interviewRef = collection(db, "interviewcalls");
    const appliedjobRef = doc(db, "applied", props.currentDocument);
    getDoc(appliedjobRef).then((doc) => {
      addDoc(interviewRef, doc.data()).then(() => {
        deleteDoc(appliedjobRef).then((e) => {
          console.log("Successfully called for interview");
        });
      });
    });
  };
  return (
    <div className="appliedapplicant-card">
      <h3>{props.jobtitle}</h3>
      {role === "Company" && <h4>Applied By {props.applicantname}</h4>}
      {role === "Applicant" && <h4>Posted By {props.comapnyname}</h4>}
      <section className="actionbuttons">
        <button onClick={handleViewjob}>View Job</button>
        {
          role==="Applicant" &&(<>
            <button>Accept</button>
          </>)
        }
        {role === "Company" && (
          <>
            <button onClick={handleinterviewcall}>call for Interview</button>
            <a
              href={props.resumelink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button>View Resume</button>
            </a>
          </>
        )}
      </section>
    </div>
  );
};

export default AppliedApplicantCard;
