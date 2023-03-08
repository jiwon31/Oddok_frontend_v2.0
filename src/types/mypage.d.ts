import { CategoryOption } from "./search-option";

export type Profile = {
  goal: string;
  targetTime: number;
  dday: string;
  ddayInfo: string;
};

export type MyRoomType = {
  id: number;
  name: string;
  category: CategoryOption;
  userId: number;
  hashtags: string[];
  image: string | null;
  isPublic: true;
  targetTime: 3;
  rule: string;
  isMicOn: boolean;
  isCamOn: boolean;
  bgm: string | null;
  currentUsers: number;
  limitUsers: number;
  endAt: string;
};
