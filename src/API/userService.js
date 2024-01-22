import axios from "../utils/axiosClient";

const postCreateUser = (email, password, username, role, image) => {
  //call API
  const form = new FormData();
  form.append("email", email);
  form.append("password", password);
  form.append("username", username);
  form.append("role", role);
  form.append("userImage", image);
  return axios.post("api/v1/participant", form);
};
const getAllUsers = () => {
  return axios.get("api/v1/participant/all");
};

const putUpdateUser = (id, username, role, image) => {
  //call API
  const form = new FormData();
  form.append("id", id);
  form.append("username", username);
  form.append("role", role);
  form.append("userImage", image);
  return axios.put("api/v1/participant", form);
};
const deleteUsers = (userId) => {
  return axios.delete("api/v1/participant", { data: { id: userId } });
};
const getUserPaginate = (page, limit) => {
  return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
};

const postLogin = (userEmail, userPassword) => {
  return axios.post(`api/v1/login`, {
    email: userEmail,
    password: userPassword,
    // delay: 2000,
  });
};

const postRegister = (userEmail, userPassword, userName) => {
  return axios.post("api/v1/register", {
    email: userEmail,
    password: userPassword,
    username: userName,
  });
};

// const postLogin1 = (email, password) => {
//   return axios.post("api/v1/login", {
//     data: { email, password },
//   });
// };

const getQuizByUser = () => {
  return axios.get("/api/v1/quiz-by-participant");
};

const getDataQuiz = (quizId) => {
  return axios.get(`/api/v1/questions-by-quiz?quizId=${quizId}`);
};
const postSubmitQuiz = (data) => {
  return axios.post(`/api/v1/quiz-submit`, { ...data });
};
const postCreateNewQuiz = (description, name, difficulty, Image) => {
  const form = new FormData();
  form.append("description", description);
  form.append("name", name);
  form.append("difficulty", difficulty);
  form.append("quizImage", Image);
  return axios.post("api/v1/quiz", form);
};
const getAllQuizForAdmin = () => {
  return axios.get(`/api/v1/quiz/all`);
};
const putUpdateQuiz = (id, name, description, difficulty, image) => {
  const form = new FormData();
  form.append("id", id);
  form.append("description", description);
  form.append("name", name);
  form.append("difficulty", difficulty);
  form.append("quizImage", image);
  return axios.put("api/v1/quiz", form);
};
const deleteQuiz = (id) => {
  return axios.delete(`/api/v1/quiz/${id}`);
};

const postCreateNewQuestionForQuiz = (quiz_id, description, questionImage) => {
  const form = new FormData();
  form.append("quiz_id", quiz_id);
  form.append("description", description);
  form.append("questionImage", questionImage);
  return axios.post("api/v1/question", form);
};
const postCreateNewAnswerForQuestion = (
  description,
  correct_answer,
  question_id
) => {
  return axios.post("api/v1/answer", {
    description,
    correct_answer,
    question_id,
  });
};

const logout = (email, refresh_token) => {
  return axios.post(`/api/v1/logout`, {
    email,
    refresh_token,
  });
};

const postAssignQuiz = (quizId, userId) => {
  return axios.post(`/api/v1/quiz-assign-to-user`, {
    quizId,
    userId,
  });
};
const getQuizWithQA = (quizId) => {
  return axios.get(`api/v1/quiz-with-qa/${quizId}`);
};
const postUpsertQA = (data) => {
  return axios.post(`api/v1/quiz-upsert-qa`, {
    ...data,
  });
};

export {
  postUpsertQA,
  getQuizWithQA,
  logout,
  postAssignQuiz,
  postCreateNewAnswerForQuestion,
  postCreateNewQuestionForQuiz,
  putUpdateQuiz,
  deleteQuiz,
  getAllQuizForAdmin,
  postCreateNewQuiz,
  postSubmitQuiz,
  getDataQuiz,
  getQuizByUser,
  postRegister,
  postLogin,
  getUserPaginate,
  deleteUsers,
  postCreateUser,
  getAllUsers,
  putUpdateUser,
};
