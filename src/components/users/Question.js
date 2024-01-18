import _ from "lodash";

const Question = (props) => {
  const { dataQuiz, currentQuiz } = props;
  if (_.isEmpty(dataQuiz)) {
    return <></>;
  }
  const handleCheckBox2 = (event, aId, qId) => {
    console.log("data props:", aId, qId);
    props.handleCheckBox(aId, qId);
  };

  return (
    <>
      {dataQuiz.image ? (
        <div className="quiz-image">
          <img src={`data:image/jpeg;base64,${dataQuiz.image}`} />
        </div>
      ) : (
        <div className="quiz-image"></div>
      )}
      <div className="quiz-content">
        <div className="question">
          Quest {currentQuiz + 1}:{dataQuiz.questionDescription}
        </div>
        <div className="answer">
          {dataQuiz.answers &&
            dataQuiz.answers.length &&
            dataQuiz.answers.map((answer, index) => {
              return (
                <div className="answer-child" key={`answer-${index}`}>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={answer.isTheSelected}
                      onChange={(event) =>
                        handleCheckBox2(event, answer.id, dataQuiz.questionId)
                      }
                    />
                    <label className="form-check-label">
                      {answer.description}
                    </label>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};
export default Question;
