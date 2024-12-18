import { UserRepository } from '../repositories/UserRepository';

export class UserService {
  static async getAllUsers() {
    return await UserRepository.findAll();
  }

  static async createUser(userData: any) {
    return await UserRepository.create(userData);
  }
}