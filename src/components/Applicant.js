import { signOut } from "firebase/auth";
import { auth } from "../config/Firebase";
import { useNavigate } from "react-router-dom";

const Applicant = () => {
  const navigate = useNavigate();
  const logout = () => {
    signOut(auth).then(() => {
      console.log("user logged out");
      navigate("/");
    });
  };
  return (
    <>
      <button onClick={logout}>logout</button>
    </>
  );
};

export default Applicant;
