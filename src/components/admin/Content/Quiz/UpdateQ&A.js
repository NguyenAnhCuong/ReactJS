import { useEffect, useState } from "react";
import Select from "react-select";
import "./UpdateQ&A.scss";
import _, { reject } from "lodash";
import { v4 as uuidv4 } from "uuid";
import {
  getAllQuizForAdmin,
  getQuizWithQA,
  postCreateNewAnswerForQuestion,
  postCreateNewQuestionForQuiz,
  postUpsertQA,
} from "../../../../API/userService";
import { TbHeartPlus } from "react-icons/tb";
import { BsFillPatchPlusFill, BsFillFileMinusFill } from "react-icons/bs";
import { AiOutlineMinusCircle, AiFillPlusSquare } from "react-icons/ai";
import { RiImageAddFill } from "react-icons/ri";
import Lightbox from "react-18-image-lightbox";
import { toast } from "react-toastify";

const UpdateQA = () => {
  const initQuestion = [
    {
      id: uuidv4(),
      description: "",
      imageFile: "",
      imageName: "",
      answers: [{ id: uuidv4(), description: "", isCorrect: false }],
    },
  ];
  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [listQuiz, setListQuiz] = useState([]);
  const [isPreviewImage, setIsPreviewImage] = useState(false);
  const [dataImage, setDataImage] = useState({
    title: "",
    url: "",
  });
  const [questions, setQuestions] = useState(initQuestion);

  useEffect(() => {
    fetchQuiz();
  }, []);

  useEffect(() => {
    if (selectedQuiz && selectedQuiz.value) {
      fetchQuizWithQA();
    }
  }, [selectedQuiz]);

  function urltoFile(url, filename, mimeType) {
    return fetch(url)
      .then(function (res) {
        return res.arrayBuffer();
      })
      .then(function (buf) {
        return new File([buf], filename, { type: mimeType });
      });
  }

  const fetchQuizWithQA = async () => {
    let res = await getQuizWithQA(selectedQuiz.value);
    if (res && res.EC === 0) {
      let newQA = [];
      for (let i = 0; i < res.DT.qa.length; i++) {
        let q = res.DT.qa[i];
        if (q.imageFile) {
          q.imageName = `Question-${q.id}.png`;
          q.imageFile = await urltoFile(
            `data:image/png;base64,${q.imageFile}`,
            `question-${q.id}.png`,
            "image/png"
          );
        }
        newQA.push(q);
      }
      setQuestions(newQA);
    }
  };

  const fetchQuiz = async () => {
    let res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      let newQuiz = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id}-${item.name}`,
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
    if (_.isEmpty(selectedQuiz)) {
      toast.error("pls choose a Quiz");
      return;
    }
    //validate answer
    questions.map((question) => {
      question.answers.map((answer) => {});
    });

    let isValidAnswer = true;
    let indexQuestion = 0,
      indexAnswer = 0;
    for (let i = 0; i < questions.length; i++) {
      for (let j = 0; j < questions[i].answers.length; j++) {
        if (!questions[i].answers[j].description) {
          isValidAnswer = false;
          indexAnswer = j;
          break;
        }
      }
      indexQuestion = i;
      if (isValidAnswer === false) break;
    }
    if (isValidAnswer === false) {
      toast.error(
        `not empty answer ${indexAnswer + 1} at question ${indexQuestion + 1}`
      );
      return;
    }
    //validate question
    let isValidQuestion = true;
    let indexQuestion1 = 0;
    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].description) {
        isValidQuestion = false;
        indexQuestion1 = i;
        break;
      }
    }
    if (isValidQuestion === false) {
      toast.error(`not empty description for Question ${indexQuestion1 + 1}`);
      return;
    }

    let questionClone = _.cloneDeep(questions);
    for (let i = 0; i < questionClone.length; i++) {
      if (questionClone[i].imageFile) {
        questionClone[i].imageFile = await toBase64(questionClone[i].imageFile);
      }
    }

    let res = await postUpsertQA({
      quizId: selectedQuiz.value,
      questions: questionClone,
    });
    if (res && res.EC === 0) {
      toast.success(res.EM);
      console.log("submit", res);
      fetchQuizWithQA();
    } else {
      toast.error(res.EM);
    }

    // setQuestions(initQuestion);
  };
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

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
  console.log("1:", questions);

  return (
    <div className="question-container">
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
                        className="form-check-input iscorrect"
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
export default UpdateQA;
