import express from 'express';
import * as userController from './user.controller';
import { validateUserData, hashPassword } from './user.middleware';
const router = express.Router();

/**
 * User Register
 */

router.post(
  '/register',
  validateUserData,
  hashPassword,
  userController.createUser,
);

export default router;
