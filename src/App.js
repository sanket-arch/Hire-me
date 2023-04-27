import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Applicant from "./components/Applicant";
import Company from "./components/Company";
import Postjob from "./components/Postjob";
import { createContext, useState } from "react";
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
          <Route path="PostJobs" element={<Postjob />} />
        </Routes>
      </userContext.Provider>
    </div>
  );
}

export default App;
