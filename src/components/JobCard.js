import { useNavigate } from "react-router-dom";
import "./styles/jobcard.css";
const JobCard = (props) => {
  const navigate = useNavigate();
  const handleViewjob = (e) => {
    navigate("/posts/" + props.jobId);
  };

  return (
    <div className="jobCard">
      <section className="jobcard-top">
        <h4>{props.companyname}</h4>
        <section className="job-location">
          <i className="fa-solid fa-location-dot"></i>
          <p> {props.location} </p>
        </section>
      </section>
      <section className="jobcard-middle">
        <section className="role">{props.role}</section>
        <section className="job-other-info">
          <section className="Skills">
            Skils: <br /> {props.skills}
          </section>
          <section className="stipend">
            stipend: <br /> ${props.stipend}
          </section>
        </section>
      </section>
      <button className="job-card-bottom" onClick={handleViewjob}>
        view job
        <i className="fa-solid fa-angle-right" style={{ color: "#000000" }}></i>
      </button>
    </div>
  );
};

export default JobCard;
