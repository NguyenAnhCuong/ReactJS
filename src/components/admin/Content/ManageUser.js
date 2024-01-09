import ModalCreateUser from "./ModalCreateUser";
import "./Manage.scss";
const ManageUser = (props) => {
  return (
    <div className="manage-user-container">
      <div className="title">Manage User</div>
      <div className="user-content">
        <div>
          <button>Add new</button>
        </div>
        <div>Table</div>
        <ModalCreateUser />
      </div>
    </div>
  );
};

export default ManageUser;
