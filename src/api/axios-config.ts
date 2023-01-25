import axios from "axios";
// import { getNewToken } from "./auth/auth-api";
// import ApiError from "./error/ApiError";

export const axiosInstance = axios.create({
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// axios.interceptors.response.use(
//   (res) => {
//     console.log("응답", res);
//     return res.data;
//   },
//   async (error) => {
//     console.log("😵응답 에러", error.response);
//     const { config, response } = error;
//     if (response.status === 401 && response.data.message === "로그인이 되어 있지 않습니다.") {
//       await getNewToken();
//       return axiosInstance.request(config);
//     }
//     throw new ApiError(response.data.message, response.status);
//   },
// );

export default axios;
