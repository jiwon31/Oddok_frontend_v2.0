import axios, { AxiosError } from "axios";
import { ErrorState } from "types/api-result";

axios.defaults.timeout = 30000;
axios.defaults.headers.common["Content-Type"] = "application/json";

axios.interceptors.response.use(
  (response) => {
    console.log("😍응답 성공", response);
    return response;
  },
  async (error: AxiosError): Promise<ErrorState | AxiosError> => {
    console.log("😵응답 에러", error.response);
    if (error.response && error.response.status >= 500) {
      return {
        result: "fail",
        reason: "server error",
        message: "내부 서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      };
    }
    if (error.code === "ECONNABORTED") {
      return {
        result: "fail",
        reason: "timeout",
        message: "네트워크 타임아웃 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      };
    }
    return error;
  },
);

export default axios;
