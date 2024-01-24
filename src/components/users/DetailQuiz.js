import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getDataQuiz, postSubmitQuiz } from "../../API/userService";
import "./DetailQuiz.scss";
import _ from "lodash";
import Question from "./Question";
import { toast } from "react-toastify";
import ModalResult from "./ModalResult";
import RightContent from "./RightContent/RightContent";
const DetailQuiz = (props) => {
  const params = useParams();
  const quizId = params.id;
  const location = useLocation();
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [dataQuiz, setDataQuiz] = useState([]);
  const [isShowModalResult, setIsShowModalResult] = useState(false);
  const [dataModal, setDataModal] = useState({});

  useEffect(() => {
    fetchQuestion();
  }, [quizId]);

  const fetchQuestion = async () => {
    const res = await getDataQuiz(quizId);
    // console.log(res);
    if (res && res.EC === 0) {
      let raw = res.DT;
      let data = _.chain(raw)
        .groupBy("id")
        .map((value, key) => {
          let questionDescription,
            image = null;
          let answers = [];
          value.forEach((item, index) => {
            if (index === 0) {
              questionDescription = item.description;
              image = item.image;
            }
            item.answers.isTheSelected = false;
            answers.push(item.answers);
          });

          return {
            questionId: key,
            answers: answers,
            questionDescription,
            image,
          };
        })
        .value();
      // console.log(data);
      setDataQuiz(data);
    }
  };
  const handlePrev = () => {
    if (currentQuiz - 1 < 0) return;

    setCurrentQuiz(currentQuiz - 1);
  };
  const handleNext = () => {
    if (dataQuiz && dataQuiz.length > currentQuiz + 1)
      setCurrentQuiz(currentQuiz + 1);
  };
  const handleFinish = async () => {
    let payload = {
      quizId: +quizId,
      answers: [],
    };
    let answers = [];
    if (dataQuiz && dataQuiz.length > 0) {
      dataQuiz.forEach((item) => {
        let questionId = item.questionId;
        let userAnswerId = [];

        item.answers.forEach((a) => {
          if (a.isTheSelected === true) {
            userAnswerId.push(a.id);
          }
        });
        answers.push({
          questionId: +questionId,
          userAnswerId: userAnswerId,
        });
      });
    }
    payload.answers = answers;
    console.log("final payload", payload);
    //call api
    let res = await postSubmitQuiz(payload);
    console.log(res);
    if (res && res.EC === 0) {
      setDataModal({
        countCorrect: res.DT.countCorrect,
        countTotal: res.DT.countTotal,
        quizData: res.DT.quizData,
      });
      setIsShowModalResult(true);
    } else {
      toast.error(res.EM);
    }
  };

  const handleCheckBox = (answerId, questionId) => {
    let dataQuizClone = _.cloneDeep(dataQuiz);
    let question = dataQuizClone.find(
      (item) => +item.questionId === +questionId
    );
    if (question && question.answers) {
      question.answers = question.answers.map((item) => {
        if (+item.id === +answerId) {
          item.isTheSelected = !item.isTheSelected;
        }
        return item;
      });
    }
    let index = dataQuizClone.findIndex(
      (item) => +item.questionId === +questionId
    );
    if (index > -1) {
      dataQuizClone[index] = question;
      setDataQuiz(dataQuizClone);
    }
  };

  return (
    <div className="detail-quiz-container">
      <div className="left-content">
        <div className="title">
          Quiz {quizId}:{location?.state?.quizTitle}
        </div>
        <hr />
        <div className="quiz-body">
          <img src={""} />
        </div>
        <div className="quiz-content">
          <Question
            handleCheckBox={handleCheckBox}
            currentQuiz={currentQuiz}
            dataQuiz={
              dataQuiz && dataQuiz.length > 0 ? dataQuiz[currentQuiz] : []
            }
          />
        </div>
        <div className="footer">
          <button
            className="btn btn-secondary"
            onClick={() => {
              handlePrev();
            }}
          >
            Prev
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              handleNext();
            }}
          >
            Next
          </button>
          <button
            className="btn btn-warning"
            onClick={() => {
              handleFinish();
            }}
          >
            Finish
          </button>
        </div>
      </div>
      <div className="right-content">
        <RightContent dataQuiz={dataQuiz} handleFinish={handleFinish} />
      </div>
      <ModalResult
        dataModal={dataModal}
        show={isShowModalResult}
        setShow={setIsShowModalResult}
      ></ModalResult>
    </div>
  );
};
export default DetailQuiz;
