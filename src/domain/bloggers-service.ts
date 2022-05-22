import { bloggersRepository, BloggerItem } from "../repositories/bloggers-db-repository";


export const bloggersService = {
  getBloggers: async (): Promise<BloggerItem[]> => {
    return bloggersRepository.getBloggers();
  },
  getBloggerById: async (id: number): Promise<BloggerItem | null> => {
    return bloggersRepository.getBloggerById(id);
  },
  createBlogger: async (name: string, youtubeUrl: string): Promise<BloggerItem> => {
    const newBlogger = {
      id: +(new Date()),
      name,
      youtubeUrl,
    }
    const createdBlogger = await bloggersRepository.createBlogger(newBlogger)
    return createdBlogger;
  },
  updateBlogger: async (id: number, name: string, youtubeUrl: string): Promise<boolean> => {
    const updatedBlogger = {
      id,
      name,
      youtubeUrl,
    }
    const result = await bloggersRepository.updateBlogger(id, updatedBlogger);

    return result;
  },
  deleteBlogger: async (id: number): Promise<boolean> => {
    return await bloggersRepository.deleteBlogger(id);
  },
}



