import { ObjectId, WithId } from "mongodb"

export type QueryType = string | string[] | undefined

export type PostItemType = {
  id: number,
  title: string,
  shortDescription: string,
  content: string,
  bloggerId: number,
  bloggerName: string
}

export type BloggerItemType = {
  id: number
  name: string
  youtubeUrl: string
}

export type UserType = WithId<{
  login: string
  passwordHash: string
  createdAt: Date
}>

export type CommentType = WithId<{
  userId: ObjectId,
  userLogin: string,
  content: string,
  addedAt: Date,
}>
