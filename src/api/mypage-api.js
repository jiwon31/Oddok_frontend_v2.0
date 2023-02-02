import { instance } from "./axios-config";

export const getProfile = async () => {
  const response = await instance({
    url: "/profile",
  });
  return response.data;
};

export const getTimeRecordList = async (date) => {
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

export const createProfile = async (data) => {
  const response = await instance({
    url: "/profile",
    method: "POST",
    data,
  });
  return response.data;
};

export const updateProfile = async (data) => {
  const response = await instance({
    url: "/profile",
    method: "PUT",
    data,
  });
  return response.data;
};

export const deleteStudyRoom = async (roomId) => {
  const response = await instance({
    url: `/study-room/${roomId}`,
    method: "DELETE",
  });
  return response.data;
};
