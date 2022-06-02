import { ObjectId } from "mongodb";
import { CommentType } from "../types/types";
import { commentsCollection } from "./db";

export const commentsRepository = {
  createCommentForSelectedPost: async (comment: CommentType) => {
    await commentsCollection.insertOne(comment);
    return comment;
  },
  getAllPosts: async (skip: number, limit: number): Promise<CommentType[]> => {
    return await commentsCollection.find().skip(skip).limit(limit).toArray();
  },
  getAllPostsCount: async () => {
    return await commentsCollection.count();
  },
  getCommentById: async (id: ObjectId): Promise<CommentType | null> => {
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
  updateComment: async ( comment: CommentType): Promise<boolean> => {
    const result = await commentsCollection.updateOne({ _id: comment._id }, { $set: comment });
    return result.matchedCount === 1
  }
};