import { useEffect, useState } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import imgsrc from "../utils/profile.jpg";
import "./styles/profile.css";
const Profile = () => {
  const [role, setRole] = useState("");
  const [user, setUser] = useState({});
  const [isLoading, setIsloading] = useState(true);
  useEffect(() => {
    async function getuser() {
      setRole(await localStorage.getItem("role"));
      setUser(await JSON.parse(localStorage.getItem("user")));
      setIsloading(false);
    }
    getuser();
  }, []);

  return (
    <>
      <Nav usertype={role} />
      <div id="profile-body">
        <h2>My Profile Information</h2>
        {isLoading && <div id="loading-msg">Loading...</div>}
        {!isLoading && (
          <div id="profile-info">
            <div id="profile-pic-holder">
              <img src={imgsrc} alt="profile img" id="profile-pic" />
            </div>
            <div id="userinfo-holder">
              <p>Name: {user.name}</p>
              <p>Mobile: {user.mobile}</p>
              <p>Email: {user.email}</p>
              <p> Address:{user.address}</p>
              <div id="resumeLinkdin-btns">
                {role === "Applicant" ? (
                  <a
                    href={user.resume_link}
                    rel="noreferrer"
                    target="_blank"
                    id="resume-btn"
                  >
                    View Resume
                  </a>
                ) : (
                  <a
                    href={user.websiteLink}
                    rel="noreferrer"
                    target="_blank"
                    id="website-btn"
                  >
                    Visit Website
                  </a>
                )}
                <a
                  href={user.linkdin_link}
                  rel="noreferrer"
                  target="_blank"
                  id="linkdin-btn"
                >
                  Visit Linkdin
                </a>
              </div>
              {/* <Link to="/editprofile" id="edit-info-btn">
                Edit Information
              </Link> */}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Profile;
