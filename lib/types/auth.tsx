import { PostType } from "./post";

export type UserLoginType = {
  name: string;
  password: string;
};
export type UserRegisterType = {
  name: string;
  email: string;
  password: string;
};
export type UserType = {
  id: number;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};
export type GetUserType = {
  userId?: string
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
  posts?: PostType[];
};
