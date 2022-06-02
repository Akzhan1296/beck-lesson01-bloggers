import { ObjectId } from "mongodb";
import { UserDBType, UserType } from "../types/types";
import { usersCollection } from "./db";

export const usersRepository = {
  createUser: async (newUser: UserType): Promise<UserDBType> => {
    await usersCollection.insertOne(newUser);
    return newUser as UserDBType;
  },
  findByLogin: async (login: string): Promise<UserDBType | null> => {
    const user = await usersCollection.findOne({ login });
    return user;
  },
  findById: async (id: ObjectId): Promise<UserDBType | null> => {
    const user = await usersCollection.findOne({ _id: id })
    return user;
  },
  getAllUsers: async (skip: number, limit: number): Promise<UserDBType[]> => {
    return await usersCollection.find().skip(skip).limit(limit).toArray();
  },
  getAllUsersCount: async () => {
    return await usersCollection.count();
  },
  deleteUser: async (id: ObjectId): Promise<boolean> => {
    const result = await usersCollection.deleteOne({ _id: id });
    return result.deletedCount === 1
  }
};