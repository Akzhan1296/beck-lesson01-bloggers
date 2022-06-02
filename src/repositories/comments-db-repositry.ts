import { ObjectId } from "mongodb";
import { CommentDBType, CommentType } from "../types/types";
import { commentsCollection } from "./db";

export const commentsRepository = {
  createCommentForSelectedPost: async (comment: CommentType): Promise<CommentDBType> => {
    await commentsCollection.insertOne(comment);
    return comment as CommentDBType;
  },
  getAllPosts: async (skip: number, limit: number): Promise<CommentDBType[]> => {
    return await commentsCollection.find().skip(skip).limit(limit).toArray();
  },
  getAllPostsCount: async () => {
    return await commentsCollection.count();
  },
  getCommentById: async (id: ObjectId): Promise<CommentDBType | null> => {
    let foundComment = await commentsCollection.findOne({ _id: id });

    if (foundComment) {
      return foundComment
    } else {
      return null;
    }
  },
  deleteComment: async (id: ObjectId): Promise<boolean> => {
    const result = await commentsCollection.deleteOne({ _id: id });
    return result.deletedCount === 1
  },
  updateComment: async (id: ObjectId, comment: CommentType): Promise<boolean> => {
    const result = await commentsCollection.updateOne({ _id: id}, { $set: comment });
    return result.matchedCount === 1
  }
};