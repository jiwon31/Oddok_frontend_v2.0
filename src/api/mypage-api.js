import axios from "axios";

export const getProfile = async () => {
  const response = await axios({
    url: "/profile",
  });
  return response.data;
};

export const getTimeRecordList = async (date) => {
  const response = await axios({
    url: "/time-record",
    params: { date },
  });
  return response.data;
};

export const getMyRoom = async () => {
  const response = await axios({
    url: "/user/my-study-room",
  });
  return response.data;
};

export const createProfile = async (data) => {
  const response = await axios({
    url: "/profile",
    method: "POST",
    data,
  });
  return response.data;
};

export const updateProfile = async (data) => {
  const response = await axios({
    url: "/profile",
    method: "PUT",
    data,
  });
  return response.data;
};

export const deleteStudyRoom = async (roomId) => {
  const response = await axios({
    url: `/study-room/${roomId}`,
    method: "DELETE",
  });
  return response.data;
};
