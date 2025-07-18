export type User = {
  user_id: string;
  email: string;
  last_sign_in_at: string | null;
  created_at: string;
  session_count: number;
};

export type UserGroupBySessions = {
  active: number;
  inactive: number;
};