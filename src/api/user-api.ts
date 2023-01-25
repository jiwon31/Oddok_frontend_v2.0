import { axiosInstance } from "./axios-config";

export class UserApi {
  async getUserInfo() {
    const response = await axiosInstance.get("/user/info");
    return response;
  }

  async getNickname() {
    const response = await axiosInstance.get("/user/nickname");
    return response;
  }

  async editNickname(nickname: string) {
    const response = axiosInstance.patch("/user/nickname", {
      nickname,
    });
    return response;
  }
}
