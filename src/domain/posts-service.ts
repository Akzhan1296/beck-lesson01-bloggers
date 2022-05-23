import { PostItem, postsRepository } from '../repositories/posts-db-repository';

export type QueryType = string | string[] | undefined

export const postsService = {
  getPosts: async (pageNumber: QueryType, pageSize: QueryType) => {
    let pn = 1;
    let ps = 10;
    if (pageNumber) {
      pn = Number(pageNumber);
    }
    if (pageSize) {
      ps = Number(pageSize)
    }

    const skip = (pn - 1) * ps;

    const posts = await postsRepository.getPosts(skip, ps);
    const totalCount = await postsRepository.getPostsCount({} as PostItem);
    const pagesCount = Math.ceil(totalCount / ps);

    return {
      page: pn,
      pageSize: ps,
      totalCount,
      pagesCount,
      items: posts,
    }
  },
  getPostById: async (id: number): Promise<PostItem | null> => {
    return postsRepository.getPostById(id);
  },
  getPostByBloggerId: async (id: number, pageNumber: QueryType, pageSize: QueryType) => {

    let pn = 1;
    let ps = 10;
    if (pageNumber) {
      pn = Number(pageNumber);
    }
    if (pageSize) {
      ps = Number(pageSize)
    }
    const skip = (pn - 1) * ps;

    const totalCount = await postsRepository.getPostsCount({ bloggerId: id } as PostItem);
    const postsByBlogger = await postsRepository.getPostByBloggerId(id, skip, ps);
    const pagesCount = Math.ceil(totalCount / ps);

    return {
      page: pn,
      pageSize: ps,
      totalCount,
      pagesCount,
      items: postsByBlogger,
    }
  },
  createPost: async (title: string, shortDescription: string, content: string, bloggerId: number) => {
    const newPost = {
      id: +(new Date()),
      title,
      shortDescription,
      content,
      bloggerId,
      bloggerName: "string"
    }
    const createdPost = await postsRepository.createPost(newPost);
    return createdPost;
  },
  updatePost: async (id: number, title: string, shortDescription: string, content: string, bloggerId: number) => {
    const updatedPost = {
      id,
      title,
      shortDescription,
      content,
      bloggerId,
      bloggerName: "string"
    }
    const result = await postsRepository.updatePost(id, updatedPost);
    return result;
  },
  deletePost: async (id: number) => {
    return await postsRepository.deletePost(id);
  }
}
