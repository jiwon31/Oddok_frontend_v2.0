import StudyRoomError from "api/error/StudyRoomError";
import { STUDY_MESSAGE } from "utils/constants/API_ERROR";
import { instance } from "./axios-config";

export const createStudyRoom = async (roomInfo) => {
  try {
    const response = await instance({
      url: "/study-room",
      method: "POST",
      data: roomInfo,
    });
    return response;
  } catch (error) {
    throw new StudyRoomError(error, STUDY_MESSAGE.CREATE_STUDY_ROOM[error.status]);
  }
};

export const joinStudyRoom = async (roomId) => {
  try {
    const response = await instance({
      url: `/study-room/join/${roomId}`,
    });
    return response;
  } catch (error) {
    throw new StudyRoomError(error, STUDY_MESSAGE.JOIN_STUDY_ROOM[error.status]);
  }
};

export const startStudyRoom = async (roomInfo) => {
  const { id } = await createStudyRoom(roomInfo);
  const { token } = await joinStudyRoom(id);
  return { id, token };
};

export const leaveStudyRoom = async (roomId) => {
  try {
    const response = await instance({
      url: `/study-room/leave/${roomId}`,
    });
    return response;
  } catch (error) {
    throw new StudyRoomError(error, STUDY_MESSAGE.LEAVE_STUDY_ROOM[error.status]);
  }
};

export const getStudyRoom = async (roomId) => {
  const response = await instance({
    url: `/study-room/${roomId}`,
  });
  return response;
};

export const getStudyRoomList = async (searchParams, page) => {
  const response = await instance.get("/study-room", {
    params: {
      sort: searchParams.get("sort"),
      isPublic: searchParams.get("isPublic"),
      category: searchParams.get("category"),
      name: searchParams.get("title"),
      hashtag: searchParams.get("hashtag"),
      page,
    },
  });
  return response.data;
};

export const checkPassword = async (roomId, password) => {
  const response = await instance.post(`/study-room/check/${roomId}`, {
    password,
  });
  return response;
};
