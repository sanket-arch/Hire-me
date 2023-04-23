import { auth } from "../config/Firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Company = () => {
  const navigate = useNavigate();
  const logout = () => {
    signOut(auth).then(() => {
      console.log("compnay logout");
      navigate("/");
    });
  };
  return (
    <>
      <button onClick={logout}>Logout</button>
    </>
  );
};

export default Company;
