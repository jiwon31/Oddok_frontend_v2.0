export type BookmarkType = {
  id: number;
  name: string;
  hashtags: string[];
  image: string | null;
  rule: string;
  currentUsers: number;
  limitUsers: number;
  endAt: string | null;
  participant: Participant[];
  isPublic: boolean;
};

type Participant = {
  nickname: string;
  joinTime: string;
};
