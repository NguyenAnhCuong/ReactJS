import CountDown from "./CountDown";
import { useRef } from "react";

const RightContent = (props) => {
  const refDiv = useRef([]);
  const { dataQuiz } = props;

  const onTimeUp = () => {
    props.handleFinish();
  };
  // console.log(dataQuiz);

  const getClassQuestion = (index, question) => {
    if (question && question.answers.length > 0) {
      let isAnswer = question.answers.find((a) => a.isTheSelected === true);
      if (isAnswer) {
        return "question selected";
      }
    }
    return "question";
  };

  const handleClickQuestion = (question, index) => {
    props.setCurrentQuiz(index);
    if (refDiv.current) {
      refDiv.current.forEach((item) => {
        if (item && item.className === "question clicked") {
          item.className = "question";
        }
      });
    }
    if (question && question.answers.length > 0) {
      let isAnswer = question.answers.find((a) => a.isTheSelected === true);
      if (isAnswer) {
        return;
      }
    }
    refDiv.current[index].className = "question clicked";
  };
  return (
    <>
      <div className="main-timer">
        <CountDown onTimeUp={onTimeUp} />
      </div>
      <div className="main-question">
        {dataQuiz &&
          dataQuiz.length > 0 &&
          dataQuiz.map((item, index) => {
            return (
              <div
                onClick={() => handleClickQuestion(item, index)}
                key={`question - ${index} `}
                className={getClassQuestion(index, item)}
                ref={(element) => (refDiv.current[index] = element)}
              >
                {index + 1}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default RightContent;
