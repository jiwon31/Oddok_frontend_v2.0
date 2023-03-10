import { BookmarkType } from "types/bookmark";

type BookmarkUser = {
  id: number;
  nickname: string | null;
  joinTime: string | null;
  isActive: boolean;
};
const initialUsers = [
  { id: 1, nickname: null, joinTime: null, isActive: false },
  { id: 2, nickname: null, joinTime: null, isActive: false },
  { id: 3, nickname: null, joinTime: null, isActive: false },
  { id: 4, nickname: null, joinTime: null, isActive: false },
  { id: 5, nickname: null, joinTime: null, isActive: false },
];

export default function getFilteredUsersOfBookmark(participants: BookmarkType["participant"]): BookmarkUser[] {
  if (participants.length === 0) {
    return initialUsers;
  }
  const users = [];
  for (let i = 0; i < 5; i += 1) {
    if (!participants[i]) {
      users.push({ id: i + 1, nickname: null, joinTime: null, isActive: false });
    } else {
      const nickname = participants[i]!.nickname;
      const joinTime = participants[i]!.joinTime.slice(11, 16);
      users.push({ id: i + 1, nickname, joinTime, isActive: true });
    }
  }
  return users;
}
