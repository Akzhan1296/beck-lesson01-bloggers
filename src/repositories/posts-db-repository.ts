import { postsCollection } from "./db";
import { PostItemDBType, PostItemType } from '../types/types';
import { ObjectId } from "mongodb";


export const postsRepository = {
  getPosts: async (skip: number, limit: number): Promise<PostItemDBType[]> => {
    return await postsCollection.find({}, { projection: { _id: 0 } }).skip(skip).limit(limit).toArray();
  },
  getPostsCount: async (count: PostItemType) => {
    return await postsCollection.count(count);
  },
  getPostById: async (id: string): Promise<PostItemDBType | null> => {
    let foundPost = await postsCollection.findOne({ id });

    if (foundPost) {
      return foundPost
    } else {
      return null;
    }
  },
  getPostByBloggerId: async (id: string, skip: number, limit: number): Promise<PostItemDBType[] | null> => {
    let foundPost = await postsCollection.find({ bloggerId: id }, { projection: { _id: 0 } }).skip(skip).limit(limit).toArray();

    if (foundPost) {

      return foundPost
    } else {
      return null;
    }
  },
  createPost: async (newPost: PostItemType): Promise<PostItemDBType> => {
    await postsCollection.insertOne(newPost);
    return newPost as PostItemDBType;
  },
  updatePost: async (id: string, updatedPost: PostItemType): Promise<boolean> => {
    const result = await postsCollection.updateOne({ id }, { $set: updatedPost });
    return result.matchedCount === 1
  },
  deletePost: async (id: string): Promise<boolean> => {
    const result = await postsCollection.deleteOne({ id });
    return result.deletedCount === 1
  }
}
