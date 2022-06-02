import { BloggerItemDBType, CommentDBType, PostItemDBType, UserDBType } from "../types/types";

export const transferIdToString = (obj: BloggerItemDBType | PostItemDBType | CommentDBType | UserDBType) => {
  const { _id, ...rest } = obj;

  return { id: _id.toString(), ...rest }
}