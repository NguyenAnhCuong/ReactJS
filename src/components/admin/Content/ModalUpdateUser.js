import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import _ from "lodash";
import { putUpdateUser } from "../../../API/userService";
const ModalUpdateUser = (props) => {
  const { show, setShow, dataUpdate } = props;

  const handleClose = () => {
    setShow(false);
    setEmail("");
    setPassword("");
    setRole("USER");
    setUsername("");
    setImage("");
    setPreviewImg("");
    props.resetDataUpdate();
  };
  // const handleShow = () => setShow(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("USER");
  const [image, setImage] = useState("");
  const [previewImg, setPreviewImg] = useState("");

  useEffect(() => {
    if (_.isEmpty(!dataUpdate)) {
      //update state
      setEmail(dataUpdate.email);
      setRole(dataUpdate.role);
      setUsername(dataUpdate.username);
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

  function validateEmail(sEmail) {
    var filter =
      /^([\w-\.\+]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (filter.test(sEmail)) {
      return true;
    } else {
      return false;
    }
  }
  const handleSubmitUser = async () => {
    //validate
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      toast.error("Invalid Email");
      return;
    }
    if (!username) {
      toast.error("Invalid User Name");
      return;
    }

    let respone = await putUpdateUser(dataUpdate.id, username, role, image);
    console.log("respone", respone);

    if (respone && respone.EC === 0) {
      toast.success(respone.EM);
      handleClose();
      await props.fetchListUser();
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
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  disabled
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div className="form-group col-md-6">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  disabled
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-6">
                <label>UserName</label>
                <input
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </div>
              <div className="form-group col-md-4">
                <label className="form'label">Role</label>
                <select
                  className="form-select"
                  value={role}
                  onChange={(event) => setRole(event.target.value)}
                >
                  <option value="USER">User</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" />
                <label className="form-check-label">Check me out</label>
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
          <Button variant="primary" onClick={() => handleSubmitUser()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUpdateUser;
