import { Link, Outlet } from "react-router-dom";
import "./App.scss";
import PerfectScrollbar from "react-perfect-scrollbar";
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
          <PerfectScrollbar>
            <Outlet />
          </PerfectScrollbar>
        </div>
      </div>
    </div>
  );
};

export default App;
