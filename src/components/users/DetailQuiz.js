import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getDataQuiz } from "../../API/userService";
import "./DetailQuiz.scss";
import _ from "lodash";
import Question from "./Question";
const DetailQuiz = (props) => {
  const params = useParams();
  const quizId = params.id;
  const location = useLocation();
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [dataQuiz, setDataQuiz] = useState([]);

  useEffect(() => {
    fetchQuestion();
  }, [quizId]);

  const fetchQuestion = async () => {
    const res = await getDataQuiz(quizId);
    console.log(res);
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
      console.log(data);
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
        </div>
      </div>
      <div className="right-content"></div>
    </div>
  );
};
export default DetailQuiz;
