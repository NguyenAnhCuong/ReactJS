import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { deleteQuiz } from "../../../../API/userService";

const ModalDeleteQuiz = (props) => {
  const { show, setShow, dataDelete } = props;

  const handleClose = () => setShow(false);

  const handleSubmitDelete = async () => {
    let respone = await deleteQuiz(dataDelete.id);
    console.log("respone", respone);

    if (respone && respone.EC === 0) {
      toast.success(respone.EM);
      handleClose();
      await props.fetchQuiz();
    }
    if (respone && respone.EC !== 0) {
      toast.error(respone.EM);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete Quiz???</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete this quiz . id =
          <b>{dataDelete && dataDelete.id ? dataDelete.id : ""}</b>
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

export default ModalDeleteQuiz;
