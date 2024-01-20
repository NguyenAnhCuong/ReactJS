import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import _ from "lodash";
import { putUpdateQuiz } from "../../../../API/userService";

const ModalUpdateQuiz = (props) => {
  const { show, setShow, dataUpdate, setDataUpdate } = props;

  const handleClose = () => {
    setShow(false);
    setDescription("");
    setType("");
    setName("");
    setImage("");
    setPreviewImg("");
    setDataUpdate({});
  };
  // const handleShow = () => setShow(true);

  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState("");
  const [previewImg, setPreviewImg] = useState("");

  useEffect(() => {
    if (_.isEmpty(!dataUpdate)) {
      //update state
      setDescription(dataUpdate.description);
      setName(dataUpdate.name);
      setType(dataUpdate.difficulty);
      setImage("");
      if (dataUpdate.image) {
        setPreviewImg(`data:image/jpeg;base64,${dataUpdate.image}`);
      }
    }
  }, [dataUpdate]);

  const handleUploadImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewImg(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    } else {
      // setPreviewImg("");
    }
  };
  const handleSubmitQuiz = async () => {
    //validate

    let respone = await putUpdateQuiz(
      dataUpdate.id,
      name,
      description,
      type,
      image
    );
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
      {/* <Button variant="primary" onClick={handleShow}>
          Launch demo modal
        </Button> */}

      <Modal
        className="modal-add-user"
        show={show}
        onHide={handleClose}
        size="xl"
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Name Quiz</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name Quiz"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Description</label>
                <input
                  type="text"
                  className="form-control"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </div>
              <div className="form-group col-md-4">
                <label className="form'label">Type</label>
                <select
                  className="form-select"
                  value={type}
                  onChange={(event) => setType(event.target.value)}
                >
                  <option value="EASY">EASY</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="HARD">HARD</option>
                </select>
              </div>
            </div>
            <div className="col-md-12">
              <label className="form-label label-upload" htmlFor="uploadImage">
                <FcPlus />
                Upload Image
              </label>
              <input
                type="file"
                hidden
                id="uploadImage"
                onChange={(event) => handleUploadImage(event)}
              />
            </div>
            <div className="col-md-12 img-preview">
              {previewImg ? (
                <img src={previewImg} />
              ) : (
                <span>Preview Image</span>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmitQuiz()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUpdateQuiz;
