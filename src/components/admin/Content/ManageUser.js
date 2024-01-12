import ModalCreateUser from "./ModalCreateUser";
import "./Manage.scss";
import { FcPlus } from "react-icons/fc";
import { useState, useEffect } from "react";
import { getAllUsers } from "../../../API/userService";

import ListUser from "./ListUser";
import ModalUpdateUser from "./ModalUpdateUser";
import ViewUser from "./ViewUser";
import { set } from "lodash";
import DeleteUser from "./DeleteUser";
const ManageUser = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [listuser, setListUser] = useState([]);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [dataDelete, setDataDelete] = useState({});
  const [dataView, setDataView] = useState({});
  const [showDeleteUser, setShowDeleteUser] = useState(false);
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
  const handleBtnUpdateUser = (user) => {
    setShowModalUpdate(true);
    console.log(user);
    setDataUpdate(user);
  };
  const resetDataUpdate = () => {
    setDataUpdate({});
  };
  const handleView = (user) => {
    setShowModal(true);
    setDataView(user);
  };
  const handleBtnDelete = (user) => {
    setShowDeleteUser(true);
    setDataDelete(user);
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
          <ListUser
            listuser={listuser}
            handleBtnUpdateUser={handleBtnUpdateUser}
            handleView={handleView}
            handleBtnDelete={handleBtnDelete}
          ></ListUser>
        </div>
        <ModalCreateUser
          fetchListUser={fetchListUser}
          show={showModal}
          setShow={setShowModal}
        />
        <ModalUpdateUser
          fetchListUser={fetchListUser}
          dataUpdate={dataUpdate}
          show={showModalUpdate}
          setShow={setShowModalUpdate}
          resetDataUpdate={resetDataUpdate}
        />
        <ViewUser dataView={dataView} />
        <DeleteUser
          dataDelete={dataDelete}
          show={showDeleteUser}
          setShow={setShowDeleteUser}
        />
      </div>
    </div>
  );
};

export default ManageUser;
