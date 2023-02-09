export type RoomType = {
  id: number;
  name: string;
  hashtags: string[];
  image: string | null;
  currentUsers: number;
  limitUsers: number;
  isPublic: boolean;
};
