import { postsCollection } from "./db";

export type PostItem = {
  id: number,
  title: string,
  shortDescription: string,
  content: string,
  bloggerId: number,
  bloggerName: string
}

export const postsRepository = {
  getPosts: async (skip: number, limit: number):Promise<PostItem[]> => {
    return await postsCollection.find({}, {projection:{_id:0}}).skip(skip).limit(limit).toArray();
  },
  getPostsCount: async(count: PostItem) => {
    return await postsCollection.count(count);
  },
  getPostById: async (id: number): Promise<PostItem | null> => {
    let foundPost = await postsCollection.findOne({ id: id }, {projection:{_id:0}});

    if (foundPost) {
      return foundPost
    } else {
      return null;
    }
  },
  getPostByBloggerId: async (id: number, skip: number, limit: number): Promise<PostItem | null> => {
    let foundPost = await postsCollection.find({bloggerId: id}).skip(skip).limit(limit).toArray();

    if (foundPost) {
      return foundPost
    } else {
      return null;
    }
  },
  createPost: async (newPost: PostItem):Promise<PostItem>  => {
    await postsCollection.insertOne({...newPost});
    return newPost;
  },
  updatePost: async (id: number, updatedPost: PostItem): Promise<boolean>  => {
    const result = await postsCollection.updateOne({ id: id }, { $set: updatedPost });
    return result.matchedCount === 1
  },
  deletePost: async (id: number): Promise<boolean> => {
    const result = await postsCollection.deleteOne({ id: id });
    return result.deletedCount === 1
  }
}
