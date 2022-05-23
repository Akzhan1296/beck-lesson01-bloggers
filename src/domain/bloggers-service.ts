import { bloggersRepository, BloggerItem } from "../repositories/bloggers-db-repository";

export type QueryType = string | string[] | undefined

export const bloggersService = {
  getBloggers: async (pageNumber: QueryType, pageSize: QueryType, searchNameTerm: QueryType) => {

    let pn = 1;
    let ps = 10;
    let st = '';

    if (pageNumber) {
      pn = Number(pageNumber);
    }
    if (pageSize) {
      ps = Number(pageSize)
    }
    if(searchNameTerm) {
      st = searchNameTerm as string;
    }

    let filter = {} as BloggerItem ;
    if(st.length > 0){
      filter.name = st;
    }

    const skip = (pn - 1) * ps;

    const posts = await bloggersRepository.getBloggers(skip, ps, filter);
    const totalCount = await bloggersRepository.getBloggersCount(st);
    const pagesCount = Math.ceil(totalCount / ps)
    return {
      page: pn,
      pageSize: ps,
      totalCount,
      pagesCount,
      items: posts,
    }
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



