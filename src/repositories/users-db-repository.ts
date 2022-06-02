import { ObjectId } from "mongodb";
import { UserType } from "../types/types";
import { usersCollection } from "./db";

export const usersRepository = {
  createUser: async (newUser: UserType): Promise<UserType> => {
    await usersCollection.insertOne(newUser);
    return newUser;
  },
  findByLogin: async (login: string): Promise<UserType | null> => {
    const user = await usersCollection.findOne({ login })
    return user;
  },
  findById: async (id: ObjectId): Promise<UserType | null> => {
    const user = await usersCollection.findOne({ _id: id })
    return user;
  },
  getAllUsers: async (skip: number, limit: number): Promise<UserType[]> => {
    return await usersCollection.find().skip(skip).limit(limit).toArray();
  },
  getAllUsersCount: async () => {
    return await usersCollection.count();
  },
  deleteUser: async (id: ObjectId): Promise<boolean> => {
    const result = await usersCollection.deleteOne({ _id: id });
    console.log(result);
    return result.deletedCount === 1
  }
};