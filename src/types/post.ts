export type IPostType = {
  id: number;
  user_id: number;
  title: string;
  body: string;
};

export type IPostCommentType = {
  id: number;
  post_id: number;
  name: string;
  email: string;
  body: string;
};

export type IPostParams = {
  page: number;
  limit: number;
};
