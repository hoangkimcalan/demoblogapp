import { UserType } from "./auth";

export type PostType = {
  id: number;
  createdAt?: string;
  updatedAt?: string;
  title: string;
  content: string;
  category: string;
  views?: number;
  likes?: number;
  idLiked?: string[]; 
  published: string;
  authorId?: number;
  author?: UserType[];
  authorEmail: string;
};
export type PostUpdateType = {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  title: string;
  content: string;
  published: boolean;
  category: string;
  view?: number;
  like?: number;
  idLiked?: string[]; 
  authorId?: number;
  author?: UserType[];
  authorEmail: string;
};
export type PostDetailType = {
  id?: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  content: string;
  published: string;
  category: string;
  views: number;
  likes: number;
  authorId: number;
  author: UserType;
};
export type PostAddType = {
  title: string;
  content: string;
  published: boolean;
  category: string;
};

export type PostDetailCommentType = {
  id?: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  content: string;
  authorComment: string;
  authorId: string;
  PostId: string;
}