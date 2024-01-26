import i18next from "i18next";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useTranslation } from "react-i18next";

const Language = (props) => {
  const { t, i18n } = useTranslation();
  const handleChangeLanguage = (language) => {
    i18n.changeLanguage(language);
  };
  return (
    <>
      <NavDropdown
        title={i18n.language === "vi" ? "Viet Nam" : "English"}
        id="basic-nav-dropdown"
        className="languages"
      >
        <NavDropdown.Item
          onClick={() => handleChangeLanguage("en")}
          href="#action/3.1"
        >
          English
        </NavDropdown.Item>
        <NavDropdown.Item
          onClick={() => handleChangeLanguage("vi")}
          href="#action/3.2"
        >
          Việt Nam
        </NavDropdown.Item>
      </NavDropdown>
    </>
  );
};
export default Language;
