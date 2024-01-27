import axios from "axios";
import nProgress from "nprogress";
import { store } from "../redux/store";

nProgress.configure({
  showSpinner: false,
  trickleSpeed: 100,
});

const axiosClient = axios.create({
  baseURL: "http://localhost:8081/",
});

axiosClient.interceptors.request.use(
  function (config) {
    console.log(store.getState());
    const access_token = store?.getState()?.user?.account?.access_token;
    config.headers["Authorization"] = `Bearer ${access_token}`;
    nProgress.start();
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
axiosClient.interceptors.response.use(
  function (response) {
    nProgress.done();
    console.log(response);
    return response && response.data ? response.data : response;
  },
  function (error) {
    //token expired
    if (error.respone.data && error.respone.data.EC === -999) {
      window.location.href = "/login";
    }
    return error && error.respone && error.respone.data
      ? error.response.data
      : Promise.reject(error);
  }
);

export default axiosClient;
