import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteUsers } from "../../../API/userService";
import { toast } from "react-toastify";
const DeleteUser = (props) => {
  const { show, setShow, dataDelete } = props;

  const handleClose = () => setShow(false);

  const handleSubmitDelete = async () => {
    let respone = await deleteUsers(dataDelete.id);
    console.log("respone", respone);

    if (respone && respone.EC === 0) {
      toast.success(respone.EM);
      handleClose();
      props.setCurrentPage(1);
      await props.fetchListUserPaginate(1);
    }
    if (respone && respone.EC !== 0) {
      toast.error(respone.EM);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete User???</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete this user . Email =
          <b>{dataDelete && dataDelete.email ? dataDelete.email : ""}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancle
          </Button>
          <Button onClick={() => handleSubmitDelete()} variant="primary">
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteUser;
