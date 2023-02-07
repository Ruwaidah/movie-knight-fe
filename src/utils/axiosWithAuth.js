import axios from "axios";

const axiosWithAuth = () => {
  const token = localStorage.getItem("token");
  return axios.create({
    // baseURL: "https://movieknight01.herokuapp.com",
    baseURL: "http://localhost:5000",
    headers: {
      authorization: token,
    },
  });
};

export default axiosWithAuth;
