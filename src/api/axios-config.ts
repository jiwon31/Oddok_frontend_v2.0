import axios from "axios";

export const instance = axios.create({
  timeout: 30000,
  headers: { "Content-Type": "application/json" },
});

instance.interceptors.response.use(
  (response) => {
    console.log("😍응답 성공", response);
    return response;
  },
  (error) => {
    console.log("😵응답 에러", error.response);
    return Promise.reject(error.response);
  },
);

export default axios;
