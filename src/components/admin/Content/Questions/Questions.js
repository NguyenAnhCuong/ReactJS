import { useState } from "react";
import Select from "react-select";
import "./Questions.scss";
import { TbHeartPlus } from "react-icons/tb";
import { BsFillPatchPlusFill, BsFillFileMinusFill } from "react-icons/bs";
import { AiOutlineMinusCircle, AiFillPlusSquare } from "react-icons/ai";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const Questions = () => {
  const [selectedQuiz, setSelectedQuiz] = useState({});

  return (
    <div className="question-container">
      <div className="title">Manage Question</div>
      <div className="add-new-question">
        <div className="col-6 form-group">
          <label>Select Quiz:</label>
          <Select
            value={selectedQuiz}
            onChange={setSelectedQuiz}
            options={options}
          />
        </div>
      </div>
      <div className="mt-3">Add Question:</div>
      <div>
        <div className="question-content">
          <div className="form-floating description">
            <input type="text" className="form-control" placeholder="abc" />
            <label>Question Description</label>
          </div>
          <div className="group-upload">
            <label className="label-up">Upload Image</label>
            <input type="file" hidden />
            <span>0 file is Uploaded</span>
          </div>
          <div className="btn-add">
            <span>
              <BsFillPatchPlusFill className="icon-add">
                Add New
              </BsFillPatchPlusFill>
            </span>
            <span>
              <BsFillFileMinusFill className="icon-remove">
                Add New
              </BsFillFileMinusFill>
            </span>
          </div>
        </div>
        <div className="answer-content">
          <input className="form-check-input isCorrect" type="checkbox" />
          <div className="form-floating answer-name">
            <input type="text" className="form-control" placeholder="abc" />
            <label>Answer</label>
          </div>
          <div className="btn-group">
            <span>
              <AiFillPlusSquare className="icon-add"></AiFillPlusSquare>
            </span>
            <span>
              <AiOutlineMinusCircle className="icon-remove"></AiOutlineMinusCircle>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Questions;
