import { ObjectId } from 'mongodb';
import { transferIdToString } from '../application/utils';
import { postsRepository } from '../repositories/posts-db-repository';
import { PostItemDBType, PostItemType, QueryType } from '../types/types';

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
    const totalCount = await postsRepository.getPostsCount({} as PostItemType);
    const pagesCount = Math.ceil(totalCount / ps);

    return {
      page: pn,
      pageSize: ps,
      totalCount,
      pagesCount,
      items: posts,
    }
  },
  getPostById: async (id: string): Promise<PostItemDBType | null> => {
    return postsRepository.getPostById(id);
  },
  getPostByBloggerId: async (id: string, pageNumber: QueryType, pageSize: QueryType) => {

    let pn = 1;
    let ps = 10;
    if (pageNumber) {
      pn = Number(pageNumber);
    }
    if (pageSize) {
      ps = Number(pageSize)
    }
    const skip = (pn - 1) * ps;

    const totalCount = await postsRepository.getPostsCount({ bloggerId: id } as PostItemType);
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
  createPost: async (title: string, shortDescription: string, content: string, bloggerId: string) => {
    const newPost = {
      id: new ObjectId().toString(),
      title,
      shortDescription,
      content,
      bloggerId,
      bloggerName: "string"
    }
    const createdPost = await postsRepository.createPost(newPost);
    return createdPost;
  },
  updatePost: async (id: string, title: string, shortDescription: string, content: string, bloggerId: string) => {
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
  deletePost: async (id: string) => {
    return await postsRepository.deletePost(id);
  }
}
