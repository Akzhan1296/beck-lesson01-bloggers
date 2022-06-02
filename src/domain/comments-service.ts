import { ObjectId } from "mongodb";
import { commentsRepository } from "../repositories/comments-db-repositry";
import { CommentType } from "../types/types";

export const commentsService = {
  createCommentForSelectedPost: async (content: string, userLogin: string, userId: ObjectId) => {
    const newComment = {
      _id: new ObjectId(),
      content,
      userLogin,
      userId,
      addedAt: new Date(),
    }
    return commentsRepository.createCommentForSelectedPost(newComment);
  },
  getAllPosts: async (skip: number, limit: number): Promise<CommentType[]> => {
    return await commentsRepository.getAllPosts(skip, limit);
  },
  getAllPostsCount: async () => {
    return await commentsRepository.getAllPostsCount();
  },
  getCommentById: async (id: ObjectId): Promise<CommentType | null> => {
    return await commentsRepository.getCommentById(id);
  },
  deleteComment: async (id: ObjectId): Promise<boolean> => {
    return await commentsRepository.deleteComment(id);
  },
  updateComment: async (id: ObjectId, content: string, userLogin: string, userId: ObjectId): Promise<boolean> => {

    const updatedComment = {
      _id: new ObjectId(id),
      content,
      userLogin,
      userId,
      addedAt: new Date(),
    }


    return await commentsRepository.updateComment(updatedComment);
  }
};