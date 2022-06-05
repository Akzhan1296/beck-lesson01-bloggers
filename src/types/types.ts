import { ObjectId, WithId } from "mongodb"

export type QueryType = string | string[] | undefined

export type PostItemType = {
  id: string,
  title: string,
  shortDescription: string,
  content: string,
  bloggerId: string,
  bloggerName: string
};

export type PostItemDBType = WithId<PostItemType>;

export type BloggerItemType = {
  id: string,
  name: string
  youtubeUrl: string
}


export type BloggerItemDBType = WithId<BloggerItemType>

export type UserType = {
  login: string
  passwordHash: string
  createdAt: Date
}

export type UserDBType = WithId<UserType>

export type CommentType = {
  userId: ObjectId,
  userLogin: string,
  content: string,
  addedAt: Date,
}

export type CommentDBType = WithId<CommentType>