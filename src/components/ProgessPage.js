import { useNavigate } from "react-router-dom";
import "./styles/progess.css";
const Progress = () => {
  const navigate = useNavigate();
  const goback = () => {
    navigate(-1);
  };
  return (
    <div id="progress-page">
      <h1>I am Still working on this Project.</h1>
      <button onClick={goback}>goBack</button>
    </div>
  );
};

export default Progress;
