export type TUser = {
  userId: string;
  username: string;
};

export type TChat = TUser & {
  message: string;
  createdAt: string;
};
