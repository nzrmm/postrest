export type IUserType = {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
};

export type IUserPayload = {
  name: string;
  email: string;
  gender: string;
  status: string;
};

export type IUserParams = {
  page: number;
  limit: number;
  search: string;
};
