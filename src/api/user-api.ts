import { User } from "types/user";
import { instance } from "./axios-config";

export default class UserApi {
  async getUserInfo(): Promise<User> {
    const response = await instance.get("/user/info");
    return response.data;
  }

  async getNickname() {
    const response = await instance.get("/user/nickname");
    return response.data;
  }
}

export async function editNickname(nickname: string) {
  const response = instance.patch("/user/nickname", {
    nickname,
  });
  return response;
}
