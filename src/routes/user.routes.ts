import { Router } from 'express';
import UserController from '../controllers/UserController';

const router = Router();

/**
 * @swagger
 * /users:
 *   get:
 *     description: Get all users
 */
router.get('/', UserController.getAllUsers);

/**
 * @swagger
 * /users:
 *   post:
 *     description: Create a new user
 */
router.post('/users', UserController.createUser);

export default router;