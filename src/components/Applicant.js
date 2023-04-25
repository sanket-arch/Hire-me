import Nav from "./Nav";
import Footer from "./Footer";
import JobCard from "./JobCard";
import "./styles/applicant.css"
const Applicant = () => {
  return (
    <>
      <Nav usertype="Applicant" />
      <div id="applicant-body">
        <div id="search-box">
          <input type="text" placeholder="Search job" />
          <button>Search</button>
        </div>
        <JobCard />
      </div>
      <Footer />
    </>
  );
};

export default Applicant;
