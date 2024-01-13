import ModalCreateUser from "./ModalCreateUser";
import "./Manage.scss";
import { FcPlus } from "react-icons/fc";
import { useState, useEffect } from "react";
import { getAllUsers, getUserPaginate } from "../../../API/userService";

import ListUser from "./ListUser";
import ModalUpdateUser from "./ModalUpdateUser";
import ViewUser from "./ViewUser";
import { set } from "lodash";
import DeleteUser from "./DeleteUser";
import ListUserPaginate from "./ListUserPaginate";
const ManageUser = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [listuser, setListUser] = useState([]);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [dataDelete, setDataDelete] = useState({});
  const [dataView, setDataView] = useState({});
  const [showDeleteUser, setShowDeleteUser] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const Limit_user = 5;

  //componentDidMount
  useEffect(() => {
    // fetchListUser();
    fetchListUserPaginate(1);
  }, []);

  const fetchListUser = async () => {
    let response = await getAllUsers();
    if (response.EC === 0) {
      setListUser(response.DT);
    }
  };

  const fetchListUserPaginate = async (page) => {
    let response = await getUserPaginate(page, Limit_user);
    if (response.EC === 0) {
      setListUser(response.DT.users);
      setPageCount(response.DT.totalPages);
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
          {/* <ListUser
            listuser={listuser}
            handleBtnUpdateUser={handleBtnUpdateUser}
            handleView={handleView}
            handleBtnDelete={handleBtnDelete}
          ></ListUser> */}
          <ListUserPaginate
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            listuser={listuser}
            pageCount={pageCount}
            fetchListUserPaginate={fetchListUserPaginate}
            handleBtnUpdateUser={handleBtnUpdateUser}
            handleView={handleView}
            handleBtnDelete={handleBtnDelete}
          ></ListUserPaginate>
        </div>
        <ModalCreateUser
          fetchListUserPaginate={fetchListUserPaginate}
          show={showModal}
          setShow={setShowModal}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <ModalUpdateUser
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          fetchListUserPaginate={fetchListUserPaginate}
          dataUpdate={dataUpdate}
          show={showModalUpdate}
          setShow={setShowModalUpdate}
          resetDataUpdate={resetDataUpdate}
        />
        <ViewUser dataView={dataView} />
        <DeleteUser
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          dataDelete={dataDelete}
          show={showDeleteUser}
          setShow={setShowDeleteUser}
          fetchListUserPaginate={fetchListUserPaginate}
        />
      </div>
    </div>
  );
};

export default ManageUser;
