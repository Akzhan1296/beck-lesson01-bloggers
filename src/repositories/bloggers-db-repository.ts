import { bloggersCollection } from './db';
import { BloggerItemType } from '../types/types';


export const bloggersRepository = {
  getBloggers: async (skip: number, limit: number, filter: BloggerItemType): Promise<BloggerItemType[]> => {
    return await bloggersCollection.find(filter, { projection: { _id: 0 } }).skip(skip).limit(limit).toArray();
  },
  getBloggersCount: async (count: BloggerItemType) => {
    return await bloggersCollection.count(count);
  },
  getBloggerById: async (id: number): Promise<BloggerItemType | null> => {
    let blogger = await bloggersCollection.findOne({ id: id }, { projection: { _id: 0 } });
    if (blogger) {
      return blogger;
    } else {
      return null;
    }
  },
  createBlogger: async (newBlogger: BloggerItemType): Promise<BloggerItemType> => {
    await bloggersCollection.insertOne({ ...newBlogger });
    return newBlogger;
  },
  updateBlogger: async (id: number, updatedBlogger: BloggerItemType): Promise<boolean> => {
    const result = await bloggersCollection.updateOne({ id: id }, { $set: updatedBlogger });
    return result.matchedCount === 1
  },
  deleteBlogger: async (id: number): Promise<boolean> => {
    const result = await bloggersCollection.deleteOne({ id: id });
    return result.deletedCount === 1
  },
}



