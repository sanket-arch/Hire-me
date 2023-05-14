import { useEffect, useState } from "react";
import Footer from "./Footer";
import Nav from "./Nav";
import AppliedApplicantCard from "./AppliedApplicantCard";
import "./styles/appliedapplicant.css";
import { db } from "../config/Firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
const Appliedapplicant = () => {
  const [applicantList, setApplicantList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    function getapplicant() {
      setIsLoading(true);
      const applicantRef = collection(db, "applied");
      const user = JSON.parse(localStorage.getItem("user"));
      const applicantArr = query(
        applicantRef,
        where("Appliedfor.postedBy.id", "==", user.id)
      );
      onSnapshot(applicantArr, (snapshot) => {
        let templist = [];
        snapshot.docs.forEach((appliedInfo) => {
          templist.push({ ...appliedInfo.data(), docId: appliedInfo.id });
        });
        setApplicantList(templist);
        setIsLoading(false);
      });
    }
    getapplicant();
  }, []);

  return (
    <>
      <Nav usertype="Company" />
      <div id="appliedapplicant-body">
        <h2>Applied Applicants</h2>
        <div id="search-posted-job">
          <input type="text" placeholder="serach role" />
          <button>search</button>
        </div>
        {isLoading && <div id="loding-msg">Loading...</div>}
        {!isLoading && (
          <div id="appliedapplicant-cards">
            {applicantList.map((applieddetail, idx) => {
              return (
                <AppliedApplicantCard
                  key={idx}
                  currentDocument={applieddetail.docId}
                  jobtitle={applieddetail.Appliedfor.role}
                  applicantname={applieddetail.appliedby.name}
                  resumelink={applieddetail.appliedby.resume_link}
                  jobid={applieddetail.Appliedfor.id}
                />
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Appliedapplicant;
