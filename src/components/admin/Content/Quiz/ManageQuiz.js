import { useState } from "react";
import "./ManageQuiz.scss";
import Select from "react-select";
import { postCreateNewQuiz } from "../../../../API/userService";
import { toast } from "react-toastify";
import TableQuiz from "./TableQuiz";
import Accordion from "react-bootstrap/Accordion";

const option = [
  { value: "EASY", label: "EASY" },
  { value: "MEDIUM", label: "MEDIUM" },
  { value: "HARD", label: "HARD" },
];

const ManageQuiz = (props) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("EASY");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");

  const handleChangeFile = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };
  const handleSubmitQuiz = async () => {
    //validate
    if (!name || !description) {
      toast.error("Name/Description is required");
      return;
    }

    const res = await postCreateNewQuiz(description, name, type?.value, image);
    console.log(res);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      setName("");
      setDescription("");
      setImage(null);
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <div className="quiz-container">
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Manage Quiz</Accordion.Header>
          <Accordion.Body>
            <div className="add-new">
              <fieldset className="border rounded-3 p-3">
                <legend className="float-none w-auto px-3">Add New Quiz</legend>
                <div className="form-floating mb-3">
                  <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="Quiz name"
                  />
                  <label>Name</label>
                </div>
                <div className="form-floating">
                  <input
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="Quiz description"
                  />
                  <label>Description</label>
                </div>
                <div className="my-3">
                  <Select
                    defaultValue={type}
                    onChange={setType}
                    value={type}
                    options={option}
                    placeholder={"Quiz style"}
                  />
                </div>
                <div className="more-actions form-group">
                  <label className="mb-1">Upload Image</label>
                  <input
                    onChange={(event) => handleChangeFile(event)}
                    type="file"
                    className="form-control"
                  />
                </div>
                <div className="mt-3">
                  <button
                    onClick={() => handleSubmitQuiz()}
                    className="btn btn-success"
                  >
                    Save
                  </button>
                </div>
              </fieldset>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <div className="list-detail">
        <TableQuiz />
      </div>
    </div>
  );
};
export default ManageQuiz;
