import videoHome from "../../components/assets/Samsung.mp4";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HomePage = (props) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();
  return (
    <div className="homepage-container">
      <video width="500" height="400" muted autoPlay loop>
        <source src={videoHome} type="video/mp4" />
      </video>
      <div className="homepage-content">
        <div className="title">Better way to learn</div>
        <div className="description">You dont have to learn</div>
        <div className="button">
          {isAuthenticated === false ? (
            <button onClick={() => navigate("/login")}>
              Get started.It's Free
            </button>
          ) : (
            <button onClick={() => navigate("users")}>Doing Quiz</button>
          )}
        </div>
      </div>
    </div>
  );
};
export default HomePage;
