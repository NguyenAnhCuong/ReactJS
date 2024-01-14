import videoHome from "../../components/assets/Samsung.mp4";
import { useSelector } from "react-redux";

const HomePage = (props) => {
  const account = useSelector((state) => state.user.account);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <div className="homepage-container">
      <video width="500" height="400" muted autoPlay loop>
        <source src={videoHome} type="video/mp4" />
      </video>
      <div className="homepage-content">
        <div className="title">Better way to learn</div>
        <div className="description">You dont have to learn</div>
        <div className="button">
          <button>Get started</button>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
