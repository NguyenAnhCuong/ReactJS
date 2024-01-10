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

export { postCreateUser, getAllUsers };
