import { User } from '../models/User';

export class UserRepository {
  static async findAll() {
    return await User.findAll();
  }

  static async create(data: any) {
    return await User.create(data);
  }
}