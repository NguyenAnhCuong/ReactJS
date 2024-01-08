import videoHome from "../../components/assets/Samsung.mp4";

const HomePage = (props) => {
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
