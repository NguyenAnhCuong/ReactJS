import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const DeleteUser = (props) => {
  const { show, setShow, dataDelete } = props;

  const handleClose = () => setShow(false);

  const handleSubmitDelete = () => {};
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
