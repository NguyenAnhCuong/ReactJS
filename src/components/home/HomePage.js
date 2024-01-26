import videoHome from "../../components/assets/Samsung.mp4";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";

const HomePage = (props) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="homepage-container">
      <video width="500" height="400" muted autoPlay loop>
        <source src={videoHome} type="video/mp4" />
      </video>
      <div className="homepage-content">
        <div className="title">{t("homepage.title1")}</div>
        <div className="description">{t("description.description1")}</div>
        <div className="button">
          {isAuthenticated === false ? (
            <button onClick={() => navigate("/login")}>
              {t("button.login")}
            </button>
          ) : (
            <button onClick={() => navigate("users")}>
              {t("button.quiz")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default HomePage;
