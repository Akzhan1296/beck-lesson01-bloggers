import bcrypt from 'bcrypt'
import { usersRepository } from '../repositories/users-db-repository';
import { UserDBType, UserType } from '../types/types';


export const authService = {
  generateHash: async (password: string) => {
    const hash = await bcrypt.hash(password, 10)
    return hash;
  },

  /**
   *
   * @param email
   * @param password
   * @return null if credentials are incorrect and admin entity in opposite case
   */
  async checkCredentials(userLogin: string, password: string): Promise<UserDBType | null> {
    let user = await usersRepository.findByLogin(userLogin);
    if (!user) {
      return null
    }
    let result = await bcrypt.compare(password, user.passwordHash)
    if (result) {
      return user;
    }
    return null
  },
};