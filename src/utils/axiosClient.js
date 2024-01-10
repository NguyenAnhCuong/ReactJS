import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8081/",
});

axiosClient.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
axiosClient.interceptors.response.use(
  function (response) {
    console.log(response);
    return response && response.data ? response.data : response;
  },
  function (error) {
    return error && error.respone && error.respone.data
      ? error.response.data
      : Promise.reject(error);
  }
);

export default axiosClient;
