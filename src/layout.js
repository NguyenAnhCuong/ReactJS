import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import { toast, ToastContainer } from "react-toastify";
import User from "./components/users/user.js";
import Admin from "./components/admin/Admin.js";
import HomePage from "./components/home/HomePage.js";
import ManageUser from "./components/admin/Content/ManageUser.js";
import Dashboard from "./components/admin/Content/Dashboard.js";
import Login from "./components/Auth/Login.js";

const Layout = (props) => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />}></Route>
          <Route path="users" element={<User />}></Route>
        </Route>

        <Route path="/admins" element={<Admin />}>
          <Route index element={<Dashboard />}></Route>
          <Route path="manage-users" element={<ManageUser />}></Route>
        </Route>

        <Route path="/login" element={<Login />}></Route>
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pa
      />
    </>
  );
};
export default Layout;
