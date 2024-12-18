import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
import { validateUserInput } from '../validators/user.validator';

export default class UserController {
  static async getAllUsers(req: Request, res: Response) {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json(users); // No return here
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving users' }); // No return
    }
  }

  static async createUser(req: Request, res: Response) {
    const { error } = validateUserInput(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message }); // Remove return
      return; // Only use return to exit early
    }
    try {
      const user = await UserService.createUser(req.body);
      res.status(201).json(user); // No return here
    } catch (error) {
      res.status(500).json({ message: 'Error creating user' }); // No return here
    }
  }
}
