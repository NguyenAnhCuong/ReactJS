import ModalCreateUser from "./ModalCreateUser";
import "./Manage.scss";
import { FcPlus } from "react-icons/fc";
import { useState, useEffect } from "react";
import { getAllUsers } from "../../../API/userService";

import ListUser from "./ListUser";
const ManageUser = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [listuser, setListUser] = useState([]);

  //componentDidMount
  useEffect(() => {
    fetchListUser();
  }, []);

  const fetchListUser = async () => {
    let response = await getAllUsers();
    if (response.EC === 0) {
      setListUser(response.DT);
    }
  };

  return (
    <div className="manage-user-container">
      <div className="title">Manage User</div>
      <div className="user-content">
        <div className="btn-add-new">
          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            <FcPlus />
            Add new
          </button>
        </div>
        <div className="table-user-container">
          <ListUser listuser={listuser}></ListUser>
        </div>
        <ModalCreateUser
          fetchListUser={fetchListUser}
          show={showModal}
          setShow={setShowModal}
        />
      </div>
    </div>
  );
};

export default ManageUser;
