import { Profile } from "types/mypage";
import { instance } from "./axios-config";

export default class MyPageApi {
  async getProfile() {
    const response = await instance.get<Profile | null>("/profile");
    return response.data;
  }

  async createProfile(data: Profile) {
    const response = await instance.post<Profile>("/profile", data);
    return response.data;
  }

  async updateProfile(data: Profile) {
    const response = await instance.put<Profile>("/profile", data);
    return response.data;
  }
}

export const getTimeRecordList = async (date: string) => {
  const response = await instance({
    url: "/time-record",
    params: { date },
  });
  return response.data;
};

export const getMyRoom = async () => {
  const response = await instance({
    url: "/user/my-study-room",
  });
  return response.data;
};

export const deleteStudyRoom = async (roomId: number) => {
  const response = await instance({
    url: `/study-room/${roomId}`,
    method: "DELETE",
  });
  return response.data;
};
