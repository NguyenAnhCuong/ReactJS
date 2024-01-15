import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDataQuiz } from "../../API/userService";

const DetailQuiz = () => {
  const params = useParams();
  console.log(params);
  const quizId = params.id;
  useEffect({}, [quizId]);

  const fetchQuestion = async () => {
    const res = await getDataQuiz();
    console.log(res);
  };
  return <div className="detail-quiz-container">DetailQuiz</div>;
};
export default DetailQuiz;
