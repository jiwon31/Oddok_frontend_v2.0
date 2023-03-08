import { MyRoomType } from "types/mypage";
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

  async getMyRoom() {
    const response = await instance.get<MyRoomType | null>("/user/my-study-room");
    return response.data;
  }

  async deleteMyRoom(roomId: number) {
    const response = await instance.delete<void>(`/study-room/${roomId}`);
    return response.data;
  }
}
