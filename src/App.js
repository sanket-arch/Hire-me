import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Applicant from "./components/Applicant";
import Company from "./components/Company";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="applicant" element={<Applicant />} />
        <Route path="company" element={<Company />} />
      </Routes>
    </div>
  );
}

export default App;
