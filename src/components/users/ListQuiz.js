import { useState } from "react";
import { useEffect } from "react";
import "./ListQuiz.scss";
import { useNavigate } from "react-router-dom";
import { getQuizByUser } from "../../API/userService";

const ListQuiz = () => {
  const navigate = useNavigate();
  const [arrayQuiz, setArrayQuiz] = useState([]);

  useEffect(() => {
    getQuizData();
  }, []);

  const getQuizData = async () => {
    const res = await getQuizByUser();
    if (res && res.EC === 0) {
      setArrayQuiz(res.DT);
    }
  };

  return (
    <div className="list-quiz-container">
      {arrayQuiz &&
        arrayQuiz.length > 0 &&
        arrayQuiz.map((quiz, index) => {
          return (
            <div
              key={`${index}-quiz`}
              className="card"
              style={{ width: "18rem" }}
            >
              <img
                className="card-img-top"
                src={`data:image/jpeg;base64,${quiz.image}`}
                alt="Card image cap"
              />
              <div className="card-body">
                <h5 className="card-title">Quiz {index + 1}</h5>
                <p className="card-text">{quiz.description}</p>
                <button
                  onClick={() =>
                    navigate(`/quiz/${quiz.id}`, {
                      state: { quizTitle: quiz.description },
                    })
                  }
                  className="btn btn-primary"
                >
                  Start Quiz
                </button>
              </div>
            </div>
          );
        })}
      {arrayQuiz && arrayQuiz.length === 0 && (
        <div>You dont have any quiz...</div>
      )}
    </div>
  );
};
export default ListQuiz;
