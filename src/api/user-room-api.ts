import { MyRoomType } from "types/mypage";
import { instance } from "./axios-config";

export default class UserRoomApi {
  async getMyRoom() {
    const response = await instance.get<MyRoomType | null>("/user/my-study-room");
    return response.data;
  }

  async updateStudyRoom(roomId: number, updatedInfo: MyRoomType) {
    const response = await instance.put<MyRoomType>(`/study-room/${roomId}`, updatedInfo);
    return response.data;
  }

  async deleteMyRoom(roomId: number) {
    const response = await instance.delete<void>(`/study-room/${roomId}`);
    return response.data;
  }
}
