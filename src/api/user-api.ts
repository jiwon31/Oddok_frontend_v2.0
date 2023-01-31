import axios from "axios";
import { User } from "types/user";

export default class UserApi {
  async getUserInfo(): Promise<User> {
    const response = await axios.get("/user/info");
    return response.data;
  }

  async getNickname() {
    const response = await axios.get("/user/nickname");
    return response.data;
  }
}

export async function editNickname(nickname: string) {
  const response = axios.patch("/user/nickname", {
    nickname,
  });
  return response;
}
