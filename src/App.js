import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Applicant from "./components/Applicant";
import Company from "./components/Company";
import Postjob from "./components/Postjob";
import { createContext, useState } from "react";
import Jobdetials from "./components/Jobdetails";
// import ErrorPage from "./components/ErrorPage";
import Progress from "./components/ProgessPage";
import Appliedjob from "./components/Appliedjob";
import Appliedapplicant from "./components/Appliedapplicant";

export const userContext = createContext();
function App() {
  const [user, setUser] = useState(null);
  return (
    <div className="App">
      <userContext.Provider
        value={{
          userdetails: user,
          setUserdetails: setUser,
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="applicant" element={<Applicant />} />
          <Route path="company" element={<Company />} />
          <Route path="posts/:postid" element={<Jobdetials />} />
          <Route path="PostJobs" element={<Postjob />} />
          <Route path="Appliedjob" element={<Appliedjob />} />
          <Route path="viewapplicant" element={<Appliedapplicant />} />
          <Route path="*" element={<Progress />} />
        </Routes>
      </userContext.Provider>
    </div>
  );
}

export default App;
