import { useEffect, useState } from "react";
import Select from "react-select";
import "./Questions.scss";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import {
  getAllQuizForAdmin,
  postCreateNewAnswerForQuestion,
  postCreateNewQuestionForQuiz,
} from "../../../../API/userService";
import { TbHeartPlus } from "react-icons/tb";
import { BsFillPatchPlusFill, BsFillFileMinusFill } from "react-icons/bs";
import { AiOutlineMinusCircle, AiFillPlusSquare } from "react-icons/ai";
import { RiImageAddFill } from "react-icons/ri";
import Lightbox from "react-18-image-lightbox";

const Questions = () => {
  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [listQuiz, setListQuiz] = useState([]);
  const [isPreviewImage, setIsPreviewImage] = useState(false);
  const [dataImage, setDataImage] = useState({
    title: "",
    url: "",
  });
  const [questions, setQuestions] = useState([
    {
      id: uuidv4(),
      description: "",
      imageFile: "",
      imageName: "",
      answers: [{ id: uuidv4(), description: "", isCorrect: false }],
    },
  ]);

  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    let res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      let newQuiz = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id}-${item.description}`,
        };
      });
      setListQuiz(newQuiz);
    }
  };

  const handleAddRemoveQuestion = (type, id) => {
    if (type === "ADD") {
      const newQuestion = {
        id: uuidv4(),
        description: "",
        imageFile: "",
        imageName: "",
        answers: [{ id: uuidv4(), description: "", isCorrect: false }],
      };
      setQuestions([...questions, newQuestion]);
    }

    if (type === "REMOVE") {
      let questionClone = _.cloneDeep(questions);
      questionClone = questionClone.filter((item) => item.id !== id);
      setQuestions(questionClone);
    }
  };

  const handleAddRemoveAnswer = (type, questionId, answerId) => {
    let questionClone = _.cloneDeep(questions);
    if (type === "ADD") {
      const newAnswer = { id: uuidv4(), description: "", isCorrect: false };

      let index = questionClone.findIndex((item) => item.id === questionId);
      questionClone[index].answers.push(newAnswer);
      setQuestions(questionClone);
    }

    if (type === "REMOVE") {
      let index = questionClone.findIndex((item) => item.id === questionId);
      questionClone[index].answers = questionClone[index].answers.filter(
        (item) => item.id !== answerId
      );
      setQuestions(questionClone);
    }
  };
  const handleOnChange = (type, questionId, value) => {
    if (type === "QUESTION") {
      let questionClone = _.cloneDeep(questions);
      let index = questionClone.findIndex((item) => item.id === questionId);
      if (index > -1) {
        questionClone[index].description = value;
        setQuestions(questionClone);
      }
    }
  };
  const handleOnChangeFileQuestion = (questionId, event) => {
    let questionClone = _.cloneDeep(questions);
    let index = questionClone.findIndex((item) => item.id === questionId);
    if (
      index > -1 &&
      event.target &&
      event.target.files &&
      event.target.files[0]
    ) {
      questionClone[index].imageFile = event.target.files[0];
      questionClone[index].imageName = event.target.files[0].name;
      setQuestions(questionClone);
    }
  };
  const handleAnswerQuestion = (type, answerId, questionId, value) => {
    let questionClone = _.cloneDeep(questions);
    let index = questionClone.findIndex((item) => item.id === questionId);
    if (index > -1) {
      questionClone[index].answers = questionClone[index].answers.map(
        (answer) => {
          if (answer.id === answerId) {
            if (type === "CHECKBOX") {
              answer.isCorrect = value;
            }
            if (type === "INPUT") {
              answer.description = value;
            }
          }
          return answer;
        }
      );
      setQuestions(questionClone);
    }
  };

  const handleSubmitQuiz = async () => {
    console.log(questions);
    //validate data

    //submit question
    await Promise.all(
      questions.map(async (value) => {
        const question = await postCreateNewQuestionForQuiz(
          +selectedQuiz.value,
          value.description,
          value.imageFile
        );
        //submit answer
        await Promise.all(
          value.answers.map(async (answer) => {
            await postCreateNewAnswerForQuestion(
              answer.description,
              answer.isCorrect,
              question.DT.id
            );
          })
        );
        console.log(question);
      })
    );
  };

  const handlePreviewImage = (questionId) => {
    let questionClone = _.cloneDeep(questions);
    let index = questionClone.findIndex((item) => item.id === questionId);

    if (index > -1) {
      setDataImage({
        url: URL.createObjectURL(questionClone[index].imageFile),
        title: questionClone[index].imageName,
      });
      setIsPreviewImage(true);
    }
  };

  return (
    <div className="question-container">
      <div className="title">Manage Question</div>
      <hr />
      <div className="add-new-question">
        <div className="col-6 form-group">
          <label className="mb-2">Select Quiz:</label>
          <Select
            value={selectedQuiz}
            onChange={setSelectedQuiz}
            options={listQuiz}
          />
        </div>
      </div>
      <div className="mt-3 mb-2">Add Question:</div>
      {questions &&
        questions.length > 0 &&
        questions.map((question, index) => {
          return (
            <div key={question.id} className="q-main mb-4">
              <div className="question-content">
                <div className="form-floating description">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="abc"
                    value={question.description}
                    onChange={(event) =>
                      handleOnChange(
                        "QUESTION",
                        question.id,
                        event.target.value
                      )
                    }
                  />
                  <label>Question {index + 1} description</label>
                </div>
                <div className="group-upload">
                  <label htmlFor={`${question.id}`}>
                    <RiImageAddFill className="label-up" />
                  </label>
                  <input
                    id={`${question.id}`}
                    type="file"
                    hidden
                    onChange={(event) =>
                      handleOnChangeFileQuestion(question.id, event)
                    }
                  />
                  <span>
                    {question.imageName ? (
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => handlePreviewImage(question.id)}
                      >
                        {question.imageName}
                      </span>
                    ) : (
                      "0 file is Uploaded"
                    )}
                  </span>
                </div>
                <div className="btn-add">
                  <span onClick={() => handleAddRemoveQuestion("ADD", "")}>
                    <BsFillPatchPlusFill className="icon-add"></BsFillPatchPlusFill>
                  </span>
                  {questions.length > 1 && (
                    <span
                      onClick={() =>
                        handleAddRemoveQuestion("REMOVE", question.id)
                      }
                    >
                      <BsFillFileMinusFill className="icon-remove"></BsFillFileMinusFill>
                    </span>
                  )}
                </div>
              </div>

              {question.answers &&
                question.answers.length > 0 &&
                question.answers.map((answer, index) => {
                  return (
                    <div key={answer.id} className="answer-content">
                      <input
                        className="form-check-input isCorrect"
                        type="checkbox"
                        onChange={(event) =>
                          handleAnswerQuestion(
                            "CHECKBOX",
                            answer.id,
                            question.id,
                            event.target.checked
                          )
                        }
                        checked={answer.isCorrect}
                      />
                      <div className="form-floating answer-name">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="abc"
                          value={answer.description}
                          onChange={(event) =>
                            handleAnswerQuestion(
                              "INPUT",
                              answer.id,
                              question.id,
                              event.target.value
                            )
                          }
                        />
                        <label>Answer {index + 1}</label>
                      </div>
                      <div className="btn-group">
                        <span
                          onClick={() =>
                            handleAddRemoveAnswer("ADD", question.id)
                          }
                        >
                          <AiFillPlusSquare className="icon-add"></AiFillPlusSquare>
                        </span>
                        {question.answers.length > 1 && (
                          <span
                            onClick={() =>
                              handleAddRemoveAnswer(
                                "REMOVE",
                                question.id,
                                answer.id
                              )
                            }
                          >
                            <AiOutlineMinusCircle className="icon-remove"></AiOutlineMinusCircle>
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          );
        })}
      {questions && questions.length > 0 && (
        <div>
          <button
            className="btn btn-warning"
            onClick={() => handleSubmitQuiz()}
          >
            Save Question
          </button>
        </div>
      )}
      {isPreviewImage === true && (
        <Lightbox
          mainSrc={dataImage.url}
          imageCaption={dataImage.title}
          onCloseRequest={() => setIsPreviewImage(false)}
        ></Lightbox>
      )}
    </div>
  );
};
export default Questions;
