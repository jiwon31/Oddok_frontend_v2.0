import { User } from "types/user";
import { instance } from "./axios-config";

export default class UserApi {
  async getUserInfo() {
    const response = await instance.get<User>("/user/info");
    return response.data;
  }

  async updateNickname(nickname: string) {
    const response = await instance.patch<{ nickname: string }>("/user/nickname", {
      nickname,
    });
    return response.data;
  }
}
