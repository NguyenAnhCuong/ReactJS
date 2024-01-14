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
  return axios.post("api/v1/login", {
    email: userEmail,
    password: userPassword,
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

export {
  postRegister,
  postLogin,
  getUserPaginate,
  deleteUsers,
  postCreateUser,
  getAllUsers,
  putUpdateUser,
};
