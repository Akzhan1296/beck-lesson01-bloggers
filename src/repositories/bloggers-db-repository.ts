import { bloggersCollection } from './db';

export type BloggerItem = {
  id: number
  name: string
  youtubeUrl: string
}

export const bloggersRepository = {
  getBloggers: async (skip: number, limit: number, filter: BloggerItem): Promise<BloggerItem[]> => {
    return await bloggersCollection.find(filter, {projection:{_id:0}}).skip(skip).limit(limit).toArray();
  },
  getBloggersCount: async (count: BloggerItem) => {
    return await bloggersCollection.count(count);
  },
  getBloggerById: async (id: number): Promise<BloggerItem | null> => {
    let blogger = await bloggersCollection.findOne({ id: id }, {projection:{_id:0}});
    if (blogger) {
      return blogger;
    } else {
      return null;
    }
  },
  createBlogger: async (newBlogger: BloggerItem): Promise<BloggerItem> => {
    const result = await bloggersCollection.insertOne(newBlogger);
    const {_id, ...rest} = result
    return rest;
  },
  updateBlogger: async (id: number, updatedBlogger: BloggerItem): Promise<boolean> => {
    const result = await bloggersCollection.updateOne({ id: id }, { $set: updatedBlogger });
    return result.matchedCount === 1
  },
  deleteBlogger: async (id: number): Promise<boolean> => {
    const result = await bloggersCollection.deleteOne({ id: id });
    return result.deletedCount === 1
  },
}



