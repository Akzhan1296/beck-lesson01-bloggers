import { ObjectId } from 'mongodb';
import { authService } from './auth-service';
import { UserDBType, UserType } from '../types/types';
import { usersRepository } from '../repositories/users-db-repository';


export const usersService = {
  getAllUsers: async (skip: number, limit: number): Promise<UserDBType[]> => {
    return await usersRepository.getAllUsers(skip, limit);
  },
  getAllUsersCount: async () => {
    return await usersRepository.getAllUsersCount();
  },
  createUser: async (userLogin: string, userPassword: string): Promise<UserDBType> => {
    const passwordHash = await authService.generateHash(userPassword);

    const newUser: UserType = {
      id: new ObjectId().toString(),
      login: userLogin,
      passwordHash,
      createdAt: new Date(),
    };

    return usersRepository.createUser(newUser);
  },
  findUserById: async(id: string): Promise<UserDBType | null> => {
    return usersRepository.findById(id);
  },
  deleteUser: async(id: string): Promise<boolean> => {
    return usersRepository.deleteUser(id);
  }
};