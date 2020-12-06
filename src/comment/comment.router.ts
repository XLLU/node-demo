import express from 'express';
import { authGuard } from '../auth/auth.middleware';
import * as commentController from './comment.controller';

const router = express.Router();

router.post('/comment', authGuard, commentController.newComment);

router.post(
  '/comment/:commentId/reply',
  authGuard,
  commentController.newReplyComment,
);

router.post('/comment/:commentId', authGuard, commentController.update);

router.delete(
  '/comment/:commentId',
  authGuard,
  commentController.destroyComment,
);

export default router;
