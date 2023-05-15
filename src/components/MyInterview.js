import { useEffect, useState } from "react";
import "./styles/myinterview.css";
import Nav from "./Nav";
import AppliedApplicantCard from "./AppliedApplicantCard";
import Footer from "./Footer";
import "./styles/myinterview.css";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/Firebase";
const MyInterview = () => {
  const [appliedDetails, setAppliedDetails] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    function fetchInterviewdeatils() {
      setisLoading(true);
      const currentuser = JSON.parse(localStorage.getItem("user"));
      const interviewRef = collection(db, "interviewcalls");
      const interviewarr = query(
        interviewRef,
        where("appliedby.id", "==", currentuser.id)
      );
      getDocs(interviewarr).then((snapshot) => {
        let infoArray = [];
        snapshot.docs.forEach((appliedInfo) => {
          infoArray.push({ ...appliedInfo.data(), docid: appliedInfo.id });
          setisLoading(false);
        });
        setAppliedDetails(infoArray);
      });
    }
    fetchInterviewdeatils();
  }, []);
  return (
    <>
      <Nav usertype="Applicant" />
      <div id="my-interview-body">
        <h2>Interview Calls</h2>{" "}
        {isLoading && <div id="loading-msg">Loading...</div>}
        {!isLoading && (
          <div id="interview-cards">
            {appliedDetails.map((applieddetail) => {
              return (
                <AppliedApplicantCard
                  key={applieddetail.Appliedfor.id}
                  jobid={applieddetail.Appliedfor.id}
                  jobtitle={applieddetail.Appliedfor.role}
                  comapnyname={applieddetail.Appliedfor.postedBy.name}
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

export default MyInterview;
