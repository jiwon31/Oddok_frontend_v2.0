export type Bookmark = {
  id: number;
  name: string;
  hashtags: string[];
  image: string | null;
  rule: string;
  current_users: number;
  limit_user: number;
  end_at: string | null;
  participant: Participant[];
};

type Participant = {
  nickname: string;
  joinTime: string;
};
