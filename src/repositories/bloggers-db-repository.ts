import { bloggersCollection } from './db';

export type BloggerItem = {
  id: number
  name: string
  youtubeUrl: string
}

export const bloggersRepository = {
  getBloggers: async (): Promise<BloggerItem[]> => {
    return bloggersCollection.find().toArray();
  },
  getBloggerById: async (id: number): Promise<BloggerItem | null> => {
    let blogger = await bloggersCollection.findOne({ id: id });
    if (blogger) {
      return blogger;
    } else {
      return null;
    }
  },
  createBlogger: async (newBlogger: BloggerItem): Promise<BloggerItem> => {
    const result = await bloggersCollection.insertOne(newBlogger);
    return newBlogger
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



