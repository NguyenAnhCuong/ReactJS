import { Link, Outlet } from "react-router-dom";
import "./App.scss";
import Header from "./components/header/header";

const App = () => {
  return (
    <div className="app-container">
      <div className="header-container">
        <Header></Header>
      </div>
      <div className="main-container">
        <div className="sidenav-container"></div>
        <div className="app-content">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default App;
